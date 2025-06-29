const asyncHandler = require('express-async-handler');
const Blog = require('../models/blog');

// Create new post 
const createNewBlog = asyncHandler(async (req, res) => {
  const { title, description, category} = req.body;
  if (!title || !description || !category) throw new Error('Missing Inputs');
  const response = await Blog.create(req.body);
  return res.status(response ? 200 : 500).json({
    success : response ? true : false, 
    message : response ? 'Create Blog successfully' : 'Create Blog failed',
    response
  });
})

// Update post
const updateBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  if (Object.keys(req.body).length === 0 ) throw new Error('Missing Inputs');
  const response = await Blog.findByIdAndUpdate({_id : blogId}, req.body, { new : true });
  return res.status(response ? 200 : 500).json({
    success : response ? true : false, 
    message : response ? 'Update Blog successfully' : 'Update Blog failed',
    response
  });
})

// getBlogs (All)
const getBlogs = asyncHandler(async (req, res) => {
  const response = await Blog.find();
  return res.status(response ? 200 : 500).json({
    success : response ? true : false, 
    message : response ? 'Get Blogs successfully' : 'Get Blogs failed',
    response
  });
})

// getBlog (One)
const getBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const response = await Blog.findByIdAndUpdate({_id : blogId}, {$inc : {numberViews : 1}}, {new : true}).populate('likes', 'firstname lastname').populate('dislikes', 'firstname lastname');
  return res.status(response ? 200 : 500).json({
    success : response ? true : false, 
    message : response ? 'Get one blog successfully' : 'Get one blog failed',
    response
  });
})


// handle like post
/*
  *, Khi người dùng like bài viết : 
    1, Nếu người dùng đã dislike trước đó thì => bỏ dislike
    2, Nếu người dùng đã like trước đó thì => bỏ like / thêm like
  *, Khi người dùng dislike bài viết : 
    1, Nếu người dùng đã dislike trước đó thì => bỏ dislike
    2, Nếu người dùng đã like trước đó thì => bỏ like và thiết lập dislike
*/
const likeBlog = asyncHandler(async (req, res)=> {
  const { _id } = req.user;
  const { blogId } = req.params;
  if (!blogId) throw new Error('Missing Inputs');
  const blog = await Blog.findById({_id : blogId});
  // Kiểm tra user đã dislike trước đó chưa
  const isdisliked = blog.dislikes.some(el => el.toString() === _id)
  if (isdisliked) {
    const response = await Blog.findByIdAndUpdate({_id : blogId}, {$pull : {dislikes : _id }, $push : {likes : _id}}, { new : true })
    return res.status(response ? 200 : 500).json({
      success : response ? true : false,
      response
    })
  }
  // // Kiểm tra user đã like trước đó chưa
  const isliked = blog.likes.some(el => el.toString() === _id)
  if (isliked) {
    const response = await Blog.findByIdAndUpdate({_id : blogId}, {$pull : { likes : _id}}, {new : true})
    return res.status(response ? 200 : 500).json({
      success : response ? true : false,
      response
    })
  } else {
    const response = await Blog.findByIdAndUpdate({_id : blogId}, {$push : { likes : _id}}, {new : true})
    return res.status(response ? 200 : 500).json({
      success : response ? true : false,
      response
    })
  }
})

// dislike 
const dislikeBlog = asyncHandler(async (req, res) => {
  // id của user muốn dislike
  const { _id } = req.user;
  // id của bài blog muốn dislike
  const { blogId } = req.params;
  if (!blogId) throw new Error('Missing Inputs');
  const blog = await Blog.findById({_id : blogId});
  // Kiểm tra user đã like trước đó chưa :
  const isliked = blog.likes.some(el => el.toString() === _id);
  if (isliked) {
    const response = await Blog.findByIdAndUpdate(
      { _id: blogId },
      {
        $pull: { likes: _id },
        $push: { dislikes : _id } 
      },
      { new: true } // Return the modified document
    );
    return res.status(response ? 200 : 500).json({
      success : response ? true : false,
      response
    })
  }
  // Kiểm tra user đã dislike trước đó chưa :
  const isdisliked = blog.dislikes.some(el => el.toString() === _id);
  if (isdisliked) {
    const response = await Blog.findByIdAndUpdate({_id : blogId}, {$pull : { dislikes : _id }}, {new : true});
    return res.status(response ? 200 : 500).json({
      success : response ? true : false,
      response
    })
  } else {
    const response = await Blog.findByIdAndUpdate({_id : blogId}, {$push : { dislikes : _id }}, {new : true});
    return res.status(response ? 200 : 500).json({
      success : response ? true : false,
      response
    })
  }
})

// Delete blog
const deleteBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  const response = await Blog.findByIdAndDelete({_id : blogId});
  return res.status(response ? 200 : 500).json({
    success : response ? true : false,
    message : response ? 'Delete blog successfully' : 'Delete blog failed',
    response
  })
})

// Uploang Image Blog 
const uploadImageBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params;
  if (!req.file) throw new Error('No file uploaded') 
  const response = await Blog.findByIdAndUpdate({_id : blogId}, {$set : {image : req.file.path}}, {new : true});
  return res.status(response ? 200 : 500).json({
    success : response ? true : false,
    message : response ? 'Upload image successfully' : 'Upload image failed',
    response
  })
})
module.exports = { createNewBlog, updateBlog, deleteBlog, getBlogs, getBlog, likeBlog, dislikeBlog, uploadImageBlog }