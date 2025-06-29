const Coupon = require('../models/coupon');
const asyncHandler = require('express-async-handler');

// Tạo Coupon
const createCoupon = asyncHandler(async (req, res) => {
  const { name, discountType, discountValue, expirationDate} = req.body;
  if (!name || !discountType || !discountValue || !expirationDate) throw new Error('Missing Inputs')
  const response = await Coupon.create({...req.body, expirationDate : Date.now() + expirationDate * 24 * 60 * 60 * 1000});
  return res.status(response ? 200 : 500).json({
    success : response ? true : false, 
    message : response ? 'Coupon has been created' : 'Coupon created unsuccessfully',
    response
  })
})

// Lấy danh sách Coupons
const getCoupons = asyncHandler(async (req, res) => {
  const response = await Coupon.find().select('-createdAt -updatedAt');
  return res.status(response ? 200 : 500).json({
    success : response ? true : false, 
    message : response ? 'Get Coupons successfully' : 'Get Coupons unsuccessfully',
    response
  })
})

// Lấy Coupon theo ID
const getCoupon = asyncHandler(async (req, res) => {
  const { couponId } = req.params;
  const response = await Coupon.findById({_id : couponId});
  return res.status(response ? 200 : 500).json({
    success : response ? true : false, 
    message : response ? 'Get Coupons successfully' : 'Get Coupons unsuccessfully',
    response
  })
})

// Cập nhật Coupon
const updateCoupon = asyncHandler(async (req, res) => {
  const { couponId } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error('Missing Inputs');
  if (req.body.expirationDate) req.body.expirationDate = Date.now() + req.body.expirationDate * 24 * 60 * 60 * 1000
  const response = await Coupon.findByIdAndUpdate({_id : couponId}, req.body, {new : true});
  return res.status(response ? 200 : 500).json({
    success : response ? true : false, 
    message : response ? 'Update coupon successfully' : 'Update Coupons unsuccessfully',
    response
  })
})

// Xóa Coupon
const deleteCoupon = asyncHandler(async (req, res) => {
  const { couponId } = req.params;
  const response = await Coupon.findByIdAndDelete({_id : couponId});
  return res.status(response ? 200 : 500).json({
    success : response ? true : false, 
    message : response ? 'Delete coupon successfully' : 'Delete Coupons unsuccessfully',
    response
  })
})

module.exports = { createCoupon, updateCoupon, getCoupon, getCoupons, deleteCoupon }