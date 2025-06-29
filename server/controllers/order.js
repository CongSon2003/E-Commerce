const asyncHandler = require("express-async-handler");
const Order = require("../models/order");
const User = require("../models/user");
const Coupon = require("../models/coupon");
const { response } = require("express");
// handleCoupon là một hàm dùng để xử lý mã giảm giá (coupon) và tính toán tổng tiền sau khi áp dụng mã giảm giá đó.
// Hàm này nhận vào một mã giảm giá và tổng tiền ban đầu, sau đó trả về tổng tiền sau khi áp dụng mã giảm giá.
const handleCoupon = async (coupon, total) => {
  if ( coupon ) {
    const getCoupon = await Coupon.findById({_id : coupon});
    const { discountType, discountValue, expirationDate } = getCoupon;
    const currentDate = new Date().getTime();
    const expirationDateInMs = new Date(expirationDate).getTime();
    if (currentDate > expirationDateInMs || coupon.isActive === false) {
      // Nếu coupon đã hết hạn hoặc không còn hoạt động
      console.log("Coupon is expired or inactive");
      return total;
    } 
    if (discountType === "percentage") {
      console.log("percentage");
      return total * (1 - discountValue / 100);
    } 
    if (discountType === "fixed") {
      return total - discountValue;
    }
  } else {
    return total;
  }
}
const createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { coupon, paymentMethod } = req.body;
  const userCart = await User.findById(_id).select("cart").populate("cart.product","title price");
  const total = userCart?.cart.reduce((sum, item) => {
    const productPrice = item.product.price;
    const productCount = item.quantity;
    return sum + (productPrice * productCount);
  }, 0);
  const totalAfterCoupon = await handleCoupon(coupon, total);
  const products = userCart.cart.map(item => ({
    product : item.product,
    count : item.quantity,
    color : item.color,
  }));
  console.log(totalAfterCoupon);
  const dataCreate = { customerId : _id, products, coupon, total : totalAfterCoupon, paymentMethod};
  const response = await Order.create(dataCreate);
  return res.status(200).json({
    response
  });
});

// updateStatus là một hàm xử lý yêu cầu cập nhật trạng thái đơn hàng.
const updateStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  if (!orderId || !status) {
    return res.status(400).json({ message: "Order ID and status are required" });
  }
  const order = await Order.findByIdAndUpdate({ _id : orderId}, { status}, { new : true});
  return res.status(200).json({
    message: "Order status updated successfully",
    response : order,
  });
})

// Hàm này sẽ tìm kiếm tất cả các đơn hàng của người dùng dựa trên ID người dùng (customerId).
const getOrdersUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const orders = await Order.find({customerId : _id})
  return res.status(200).json({
    message: orders ? "Get orders successfully" : "No order found",
    count : orders.length,
    response : orders ? orders : [],
  });
})


// Hàm này sẽ tìm kiếm tất cả các đơn hàng trong hệ thống và trả về danh sách đơn hàng.
const getOrdersAdmin = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  return res.status(200).json({
    message: orders ? "Get orders successfully" : "No order found",
    count : orders.length,
    response : orders ? orders : [],
  });
})

// Hàm này sẽ được xuất ra để có thể sử dụng ở nơi khác trong ứng dụng.
module.exports = { createOrder, updateStatus, getOrdersUser, getOrdersAdmin };
