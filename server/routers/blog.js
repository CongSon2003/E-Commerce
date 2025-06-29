const express = require('express');
const controllersBlog = require('../controllers/blog');
const { verify_AccessToken, isAdmin } = require('../middlewares/verifyToken')
//
const fileUploader = require('../config/cloudinary.config')
const router = express.Router();

router.post('/createBlog', [verify_AccessToken, isAdmin], controllersBlog.createNewBlog)
router.put('/updateBlog/:blogId', [verify_AccessToken, isAdmin], controllersBlog.updateBlog);
router.get('/getBlogs', controllersBlog.getBlogs);
router.put('/likeBlog/:blogId', [verify_AccessToken], controllersBlog.likeBlog)
router.put('/dislikeBlog/:blogId', [verify_AccessToken], controllersBlog.dislikeBlog)
router.get('/getBlog/:blogId', controllersBlog.getBlog)
router.delete('/deleteBlog/:blogId', [verify_AccessToken, isAdmin], controllersBlog.deleteBlog);
router.put('/uploadImageBlog/:blogId', [verify_AccessToken, isAdmin], fileUploader.single('image'), controllersBlog.uploadImageBlog)
module.exports = router;