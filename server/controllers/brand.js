const Brand = require('../models/brand');
const asyncHandler = require('express-async-handler');

// create
const createBrand = asyncHandler(async (req, res) => {
  const { title, logo, description } = req.body;
  if (!title) throw new Error('Missing inputs');
  const response = await Brand.create({title, logo, description})
  return res.status(response ? 200 : 500).json({
    success : response ? true : false,
    message : response ? 'Create Brand successfully' : 'Create Brand failed',
    response
  })
})

// update
const updateBrand = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const { BrandId } = req.params;
  if (!title || !BrandId) throw new Error('Missing inputs');
  const response = await Brand.findByIdAndUpdate({_id : BrandId}, req.body, {new : true});
  return res.status(response ? 200 : 500).json({
    success : response ? true : false,
    message : response ? 'Update brand successfully' : 'Update brand failed',
    response
  })
})

// delete
const deleteBrand = asyncHandler(async (req, res) => {
  const { BrandId } = req.params;
  const response = await Brand.findByIdAndDelete({_id : BrandId})
  return res.status(response ? 200 : 500).json({
    success : response ? true : false,
    message : response ? 'Delete Brand successfully' : 'Update Brand failed',
    response
  })
})

// get one brand
const getBrand = asyncHandler(async (req, res) => {
  const { brandId } = req.params;
  const response = await Brand.findById({_id : brandId});
  return res.status(response ? 200 : 500).json({
    success : response ? true : false,
    message : response ? 'Get one brand successfully' : 'Get one brand failed',
    response
  })
})

// get all brand
const getBrands = asyncHandler(async (req, res) => {
  const response = await Brand.find();
  res.status(response ? 200 : 500).json({
    success : response ? true : false,
    message : response ? 'Get all brand successfully' : 'Get all brand failed',
    response
  })
})
module.exports = { createBrand, updateBrand, deleteBrand, getBrand, getBrands}