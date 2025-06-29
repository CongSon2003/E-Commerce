const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt');
const sendMail = require('../ultils/sendMail')
const bcrypt = require('bcrypt');
const crypto = require('crypto')
const register = (body) => new Promise(async (resolve, reject) => {
  try {
    const result = await User.create(body);
    resolve({
      success: result ? true : false,
      message: result ? "User created successfully" : "User created failed",
      response: result ? result : null,
    });
  } catch (error) {
    reject(error);
  }
});

const login = (body) => new Promise (async (resolve, reject) => {
  try {
    const { email, password } = body;
    // Tìm user bằng email
    const user = await findUserByData({email});
    // Kiểm tra user tồn tại trong db và compare password đúng 
    const isCorrectPassword = user && bcrypt.compareSync(password, user.password);
    // Tạo accessToken
    const access_Token = isCorrectPassword && generateAccessToken(user._id, user.role);
    // Tạo refreshToken  
    const refreshToken = access_Token && generateRefreshToken(user._id);
    // Lưu refreshToken vào db
    const newUser = refreshToken && await User.findByIdAndUpdate({_id : user._id}, {refreshToken : refreshToken}, {new : true})
    // Clone đối tượng gốc và xóa thuộc tính password, refreshToken trước khi trả về cho client
    // Xoá password và refreshToken trước khi gửi về client
    const newData = newUser ? (JSON.parse(JSON.stringify(newUser))) : null
    newData && delete newData.password
    newData && delete newData.refreshToken
    resolve({
      success : isCorrectPassword ? true : false,
      accessToken : isCorrectPassword ? access_Token : null,
      message : isCorrectPassword ? "Login successfully" : "Login failed",
      response : isCorrectPassword ? newData : null
    })
  } catch (error) {
    reject(error)
  }
})
const findUserByData = asyncHandler(async (data) => {
  const result = await User.findOne(data).select(`-refreshToken`);
  return result;
});

const logout = (data) => new Promise(async (resolve, reject)=> {
  try {
    // Xóa refresh token trong db sau khi đăng xuất
    const deleteRefreshToke_User = await User.findOneAndUpdate(data, {refreshToken : ''}, {new : true})
    console.log(deleteRefreshToke_User);
    resolve({
      success : deleteRefreshToke_User ? true : false,
      message : deleteRefreshToke_User ? 'Logout successful' : 'logout failed',
      response : deleteRefreshToke_User ? deleteRefreshToke_User : null  
    })
  } catch (error) {
    reject(error)
  }
})

// Hàm này được gọi khi người dùng quên mật khẩu và gửi email để resetPassword
const forgotPassword = (email) => new Promise(async (resolve, reject) => {
  try {
    // Tìm user theo email
    const user = await findUserByData({email})
    // Kiểm tra, nếu không có user thuộc email này thì return 
    if (!user) throw new Error('User not found')
    // Gọi fuc tạo token, và lưu token đó vào trong db
    const resetToken = user.createTokenPasswordChanged()
    await user.save()

    // Gửi mail
     const html = `
      <div style = "display : flex; flex-direction : row; gap-5; w-full">
        <h1>MY SHOP</h1>
        <h2>Welcome to MY SHOP!</h2>
        <p sytle = "color: #777; font-size : 16px">Please click to change your password. Link will expire in 15 minutes...</p>
        ${user && `<button style="color: white; border-radius : 10px; cursor : pointer; text-align: center; padding : 10px 15px; background-color: #1f8cd1;">
          <a style = "color : white; text-decoration-line: none;" href = ${process.env.URL_CLIENT}/reset-password/${resetToken}>Click here</a>
        </button>`}    
      </div>`
    const response = await sendMail({email, html, subject : "Xác nhận tài khoản khách hàng"})
    resolve({
      success : true,
      message : 'Please check your email!',
      response
    })
  } catch (error) {
    reject(error)
  }
})

// Hàm này được gọi khi người dùng click vào link email để thay đổi password
const resetPassword = (token, password) => new Promise(async (resolve, reject) => {
  try {
    // Giải mã token mã client gửi đến server, kiểm tra xem token có trùng với passwordResetToken trong db không
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
    console.log(passwordResetToken);
    const user = await findUserByData({passwordResetToken, passwordResetExpires : {$gt : Date.now()}});
    if (!user) {
      throw new Error('Token expired or invalid token')
    }
    // update password mới trong db và xóa token Reset password
    user.password = password
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined
    user.passwordChangeAt = Date.now()
    user.save()

    resolve({
      success : user ? true : false,
      message : user ? 'Password change successful' : 'Password change failed',
      response : user ? user : null
    })
  } catch (error) {
    reject(error)
  }
})

// Nấy tất cả Users trong db : Chỉ dành cho admin
const getUsers = () => new Promise(async (resolve, reject) => {
  try {
    // Tìm tất cả user trong db và loại bỏ password, refreshToken
    const response = await User.find().select('-password -refreshToken');
    
    resolve({
      success : response ? true : false,
      message : response ? 'getUsers successfully' : 'getUsers failed',
      response
    })
  } catch (error) {
    reject(error)
  }
})

// Xoá user
const deleteUser = (_id) => new Promise(async (resolve, reject) => {
  try {
    const response = await User.findByIdAndDelete(_id);
    resolve({
      success : response ? true : false,
      message : response ? 'Delete user successfully' : 'Delete user failed',
      response
    })
  } catch (error) {
    reject(error)
  }
})

// Update user 
const updateUser = (_id, body) => new Promise(async (resolve, reject) => {
  try {
    const response = await User.findByIdAndUpdate(_id, body, { new : true }).select('-password -refreshToken')
    resolve({
      success : response ? true : false,
      message : response ? 'Update user successfully' : 'Update user failed',
      response
    })
  } catch (error) {
    reject(error)
  }
})

// Update user by admin : chỉnh sử user chỉ dành cho admin
const updateUserByAdmin = (_id, body) => new Promise(async (resolve, reject) => {
  try {
    const response = await User.findByIdAndUpdate(_id, body, { new : true }).select('-password -refreshToken')
    resolve({
      success : response ? true : false,
      message : response ? 'Update user successfully' : 'Update user failed',
      response
    })
  } catch (error) {
    reject(error)
  }
})

// Update address user
const updateUserAddress = (_id, body) => new Promise(async (resolve, reject) => {
  try {
    const response = await User.findByIdAndUpdate(_id, {$set : {address : body.address}}, { new : true }).select('-password -refreshToken')
    resolve({
      success : response ? true : false,
      message : response ? 'Update address user successfully' : 'Update address user failed',
      response
    })
  } catch (error) {
    reject(error)
  }
})

// Update cart user : cập nhật và thêm mới sản phẩm vào rỏ hàng 
const updateUserCart = (_id, body) => new Promise(async (resolve, reject) => {
  try {
    // Tìm user theo _id đã được gửi
    const user = await User.findById(_id);
    // Kiểm tra xem sản phẩm thêm vào đã có trong rỏ hàng hay chưa 
    const isProduct = user?.cart?.find(El_cart => El_cart.productId.toString() === body.productId);
    // Nếu sản phẩm đã có trong rỏ hàng thì update lại (quantity, color,...) của sản phẩm đó
    console.log(isProduct);
    if (isProduct) {
      console.log(isProduct);
      // Nếu màu sắc của sản phẩm đã có trong rỏ hàng thì update lại quantity
      if (isProduct.color === body.color) {
        const response = await User.updateOne({_id, "cart.productId" : isProduct.productId}, {$set : { "cart.$.quantity" : body.quantity}})
        return resolve({
          success : response ? true : false,
          message : response ? 'Update cart user successfully' : 'Update cart user failed',
          response 
        })
      } else {
        // Nếu màu sắc của sản phẩm chưa có trong rỏ hàng thì thêm mới sản phẩm đó vào rỏ hàng
        const response = await User.findByIdAndUpdate(_id, {$push : {cart : { productId : body.productId, quantity : body.quantity, color : body.color}}}, { new : true }).select('-password -refreshToken')
        return resolve({
          success : response ? true : false,
          message : response ? 'Update cart user successfully' : 'Update cart user failed',
          response
        })
      }
    } else {
      // Nếu sản phẩm chưa có trong rỏ hàng thì thêm mới sản phẩm đó vào rỏ hàng
      const response = await User.findByIdAndUpdate(_id, {$push : {cart : { product : body.productId, quantity : body.quantity, color : body.color}}}, { new : true }).select('-password -refreshToken')
      return resolve({
        success : response ? true : false,
        message : response ? 'Update cart user successfully' : 'Update cart user failed',
        response
      })
    }

  } catch (error) {
    reject(error)
  }
})
module.exports = { register, login, logout, deleteUser, updateUser, updateUserByAdmin, updateUserAddress, updateUserCart, forgotPassword, resetPassword, findUserByData, getUsers };
