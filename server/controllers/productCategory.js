const ProductCategory = require('../models/productCategory');
const asyncHandler = require('express-async-handler');

// create
const createProductCategory = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (!title) throw new Error('Missing inputs');
  const response = await ProductCategory.create({title})
  return res.status(200).json({
    success : response ? true : false,
    message : response ? 'Create successfully' : 'Create failed',
    response
  })
})

// get All
const getProductCategories = asyncHandler(async (req, res) => {
  const response = await ProductCategory.find();
  return res.status(200).json({
    success : response ? true : false,
    message : response ? 'Get productCategories successfully' : 'Get productCategories failed',
    response
  })
})

// update
const updateProductCategory = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const { ProductCategoryId } = req.params;
  if (!title || !ProductCategoryId) throw new Error('Missing inputs');
  const response = await ProductCategory.findByIdAndUpdate({_id : ProductCategoryId}, req.body, {new : true});
  res.status(200).json({
    success : response ? true : false,
    message : response ? 'Update productCategories successfully' : 'Update productCategories failed',
    response
  })
})

// delete
const deleteProductCategory = asyncHandler(async (req, res) => {
  const { ProductCategoryId } = req.params;
  const response = await ProductCategory.findByIdAndDelete({_id : ProductCategoryId})
  res.status(200).json({
    success : response ? true : false,
    message : response ? 'Delete productCategories successfully' : 'Update productCategories failed',
    response
  })
})
module.exports = { createProductCategory, updateProductCategory, deleteProductCategory, getProductCategories }