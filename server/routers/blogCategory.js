const express = require('express');
const controllersBlogCategory = require('../controllers/blogCategory');
const { verify_AccessToken } = require('../middlewares/verifyToken')
const router = express.Router();

router.post('/createProductCategories', [verify_AccessToken], controllersBlogCategory.createBlogCategories)
router.put('/updateProductCategories/:BlogCategoryId', [verify_AccessToken], controllersBlogCategory.updateBlogCategories)
router.delete('/deleteProductCategories/:BlogCategoryId', [verify_AccessToken], controllersBlogCategory.deleteBlogCategories)
router.get('/getProductCategories', controllersBlogCategory.getBlogCategories)
module.exports = router;