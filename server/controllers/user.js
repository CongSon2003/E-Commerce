const { StatusCodes } = require("http-status-codes");
const asyncHandler = require("express-async-handler");
const jwt = require('jsonwebtoken');
const servicesUser = require('../services/user');
const { generateAccessToken } = require("../middlewares/jwt");
const crypto = require('crypto');
const uniqid = require('uniqid');
const User = require("../models/user");
const sendMail = require("../ultils/sendMail");


const register_Admin = asyncHandler(async(req, res) => {
  const { email, password, firstname, lastname, mobile } = req.body;
  if (!email || !password || !firstname || !lastname || !mobile) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Missing inputs!',
      response : null
    });
  }
  const response = await User.create({ email, password, firstname, lastname, mobile });
  return res.status(200).json({
    message : response ? 'Create user successfuly' : 'Create user false',
    success : response ? true : false,
    response, 
  })
})
// register : Đắng ký một tài khoảng user mới
const register = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, password, firstname, lastname, mobile } = req.body;
  if (!email || !password || !firstname || !lastname || !mobile) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Missing inputs!',
      response : null
    });
  }
  // Tìm người dùng bằng email
  const user_email = await servicesUser.findUserByData({email});
  // Tìm người dùng bằng mobile
  const user_mobile = await servicesUser.findUserByData({mobile});
  if ( user_email || user_mobile ) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message : 'Email or Mobile has been registered',
      success : false
    })
  } else {
    const token_activate = uniqid();
    // c1 : luu vao cookie
    // res.cookie('dataUser_Register',{...req.body, token_activate}, {
    //   httpOnly : true,
    //   maxAge : 60 * 15 * 1000
    // })

    // c2 : luu vao database
    const emailHashToken = btoa(email) + '@' + token_activate;
    const newUser = await servicesUser.register({
      email : emailHashToken,
      firstname,
      lastname,
      mobile,
      password
    })
    if (newUser) {
      // Gửi mail
      const html = `
        <div style = "display : flex; flex-direction : row; gap-5; w-full">
          <h1>MY SHOP</h1>
          <h2>Welcome to MY SHOP!</h2>
          <p sytle = "color: #777; font-size : 16px">Hi, you've created a new customer account at Digital World 2. CODE : </p>
          <blockquote>${token_activate}</blockquote> 
        </div>`
      await sendMail({email, html, subject : "Xác nhận tài khoản khách hàng"})
    }

    // Sau time nếu user không nhập token thi email vẫn là emailhasToken thì sẽ xóa nó đi
    setTimeout(async () => {
      await User.deleteOne({ email : emailHashToken})
    }, 300000)

    return res.status(200).json({
      success : newUser ? true : false,
      message : newUser ? 'Please check your email to access your account.' : 'Some went wrong, please try later.'
    })
  }

});
const account_register = asyncHandler(async (req, res) => {
  // const cookie = req.cookies;
  const { token_activate } = req.params;
  const findUser = await User.findOne({ email : new RegExp(`${token_activate}$`)})
  if (findUser) { 
    findUser.email = atob(findUser?.email?.split('@')[0]);
    findUser.save();
  }
  console.log(findUser);
 return res.status(findUser ? 200 : StatusCodes.BAD_REQUEST).json({
    success : findUser ? true : false,
    message : findUser ? 'Register successfuly.' : 'Expired code.'
  })
})
// login : Đăng nhập một tài khoản user đã tồn tại 
const login = asyncHandler(async (req, res) => {
  console.log("body : ", req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success : false,
      message : 'Missing inputs',
      response : null
    })
  }
  const response = await servicesUser.login(req.body);
  if (response.success) {
    // Lưu refreshToken vào cookie
    res.cookie('refreshToken', response.response.refreshToken, { 
      httpOnly : true, // Ngăn không cho cookie bị truy cập qua Javascript
      maxAge : 6 * 24 * 60 * 60 * 1000 // Thời gian sống của cookie là 6 ngày
    }) 
  }
  res.status(StatusCodes.OK).json(response)
})

// Get one user current 
const getOneUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const response = await servicesUser.findUserByData({_id});

  // Xoá password trước khi gửi về client
  const newData = response ? JSON.parse(JSON.stringify(response)) : null
  delete newData.password
  return res.status(response ? StatusCodes.OK : StatusCodes.BAD_REQUEST).json({
    success : response ? true : false,
    message : response ? 'GetOneUser successfully' : 'GetOnUser failed',
    response : response ? newData : null
  })
})

// refresh token :
const refreshAccessToken = asyncHandler(async (req, res) => {
  // Lấy token từ cookies
  const cookie = req.cookies
  // Kiểm tra cookies có không
  if (!cookie && !cookie.refreshToken) {
    throw new Error('No refresh token in cookie')
  }
  jwt.verify(cookie.refreshToken, process.env.JWT_SECRET, async (err, decode) => {
    if(err) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success : false,
        message : 'Refresh token exprired'
      })
    }
    // Tìm user sau khi kiểm tra refresh token
    const response = await servicesUser.findUserByData({_id : decode._id, refreshToken : cookie.refreshToken})
    const newAccessToken = response ? generateAccessToken(response._id, response.role) : null
    return res.status(response ? StatusCodes.OK : StatusCodes.BAD_REQUEST).json({
      success : response ? true : false,
      message : response ? 'New Access Token has been created' : 'Refresh Token not matched',
      newAccessToken
    })
  })
})

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies
  if(!cookie || !cookie.refreshToken) {
    throw new Error('No refresh token in cookie')
  }
  const result = await servicesUser.logout({refreshToken : cookie.refreshToken});
  // Xóa refresh token trong cookie trình duyệt 
  res.clearCookie('refreshToken', { httpOnly : true, secure : true })
  res.status(StatusCodes.OK).json(result);
})

// Gửi mail
// Hàm này được gọi khi người dùng quên mật khẩu và gửi email để resetPassword
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(email);
  if (!email) {
    throw new Error('Missing email')
  }
  const result = await servicesUser.forgotPassword(email);
  return res.status(200).json(result)
})

// Hàm này được gọi khi người dùng click vào link email để thay đổi password
const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  console.log(req.body);
  if (!password || !token) throw new Error("Missing inputs")
  const response = await servicesUser.resetPassword(token, password)
  return res.status(200).json(response)
})

// Nấy tất cả Users trong db : Chỉ dành cho admin
const getUsers = asyncHandler(async (req, res) => {
  const queryObj = { ...req.query }; // copy query
  // Tách các trường đặt biệt ra khỏi query :
  const excludedFields = ["limit", "sort", "page", "fields"];
  excludedFields.forEach((item) => delete queryObj[item]);
  let queryString = JSON.stringify(queryObj);
  queryString = queryString.replace(
    /\b(gte|gt|lte|lt|eq)\b/g,
    (machEl) => `$${machEl}`
  );
  let query = JSON.parse(queryString);
  console.log(query);
  // Nếu có email trong query thì tìm kiếm theo email
  if (query?.email) {
    query.email = { $regex: query.email, $options: "i" }; // Tìm kiếm không phân biệt chữ hoa chữ thường
  }
  if (query?.email === '') {
    delete query.email; // Nếu email là chuỗi rỗng thì xoá nó khỏi query
  }
  if (query?.firstname) {
    query.firstname = { $regex: query.firstname, $options: "i" }; // Tìm kiếm không phân biệt chữ hoa chữ thường
  }
  if (query?.lastname) { 
    query.lastname = { $regex: query.lastname, $options: "i" }; // Tìm kiếm không phân biệt chữ hoa chữ thường
  }
  // tim kiếm theo tên
  console.log(query, "query");
  const response = await User.find(query).select("-password -refreshToken") // Không trả về password và refreshToken;
  return res.status(response ? StatusCodes.OK : StatusCodes.BAD_REQUEST).json({
    success: response ? true : false,
    count: response ? response.length : 0,
    message: response ? "Get all users successfully" : "Get all users failed",
    response: response ? response : null
  })
})

// Xoá user chỉ cho admin 
const deleteUser = asyncHandler(async (req, res) => {
  const { _id } = req.body;
  if(!_id) throw new Error('Missing inputs')
    
  const result = await servicesUser.deleteUser({_id})
  return res.status(result.success ? StatusCodes.OK : StatusCodes.INTERNAL_SERVER_ERROR).json(result)
})

// update user
const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!_id || Object.keys(req.body).length === 0) throw new Error('Missing inputs')
  const response = await servicesUser.updateUser(_id, req.body);
  return res.status(response.success ? StatusCodes.OK : StatusCodes.INTERNAL_SERVER_ERROR).json(response)
})

// Update user by admin : chỉnh sử user chỉ dành cho admin
const updateUserByAdmin = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error('Missing inputs')
  const response = await servicesUser.updateUserByAdmin(_id, req.body);
  return res.status(response.success ? StatusCodes.OK : StatusCodes.INTERNAL_SERVER_ERROR).json(response)
})

// Update Adress 
const updateUserAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!req.body.address) throw new Error('Missing input');
  const response = await servicesUser.updateUserAddress(_id, req.body);
  return res.status(200).json(response)
})
// Update Wishlist : thêm sản phẩm vào danh sách yêu thích
// Update Cart : cập nhật rỏ hàng của người dùng
const updateUserCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { productId, quantity, color} = req.body;
  if (!productId || !quantity || !color) throw new Error('Missing Inputs');
  const response = await servicesUser.updateUserCart(_id, req.body);
  return res.status(200).json(response)
})
module.exports = { register_Admin, register, login, account_register, refreshAccessToken, deleteUser, updateUser, updateUserByAdmin, updateUserAddress, updateUserCart, logout, forgotPassword, resetPassword, getOneUser, getUsers };
