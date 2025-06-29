const BlogCategory = require('../models/blogCategory');
const asyncHandler = require('express-async-handler');

// create
const createBlogCategories = asyncHandler(async (req, res) => {
  const { title } = req.body;
  if (!title) throw new Error('Missing inputs');
  const response = await BlogCategory.create({title})
  return res.status(response ? 200 : 500).json({
    success : response ? true : false,
    message : response ? 'Create BlogCategories successfully' : 'Create failed',
    response
  })
})

// get All
const getBlogCategories = asyncHandler(async (req, res) => {
  const response = await BlogCategory.find().select('title _id');
  return res.status(response ? 200 : 500).json({
    success : response ? true : false,
    message : response ? 'Get BlogCategories successfully' : 'Get BlogCategories failed',
    response
  })
})

// update
const updateBlogCategories = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const { BlogCategoryId } = req.params;
  if (!title || !BlogCategoryId) throw new Error('Missing inputs');
  const response = await BlogCategory.findByIdAndUpdate({_id : BlogCategoryId}, req.body, {new : true});
  return res.status(response ? 200 : 500).json({
    success : response ? true : false,
    message : response ? 'Update productCategories successfully' : 'Update productCategories failed',
    response
  })
})

// delete
const deleteBlogCategories = asyncHandler(async (req, res) => {
  const { BlogCategoryId } = req.params;
  const response = await BlogCategory.findByIdAndDelete({_id : BlogCategoryId})
  return res.status(response ? 200 : 500).json({
    success : response ? true : false,
    message : response ? 'Delete productCategories successfully' : 'Update productCategories failed',
    response
  })
})
module.exports = { createBlogCategories, updateBlogCategories, deleteBlogCategories, getBlogCategories }