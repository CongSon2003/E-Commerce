const express = require('express');
const controllersProductCategory = require('../controllers/productCategory');
const { verify_AccessToken } = require('../middlewares/verifyToken')
const router = express.Router();

router.post('/createProductCategories', [verify_AccessToken], controllersProductCategory.createProductCategory)
router.put('/updateProductCategories/:ProductCategoryId', [verify_AccessToken], controllersProductCategory.updateProductCategory)
router.delete('/deleteProductCategories/:ProductCategoryId', [verify_AccessToken], controllersProductCategory.deleteProductCategory)
router.get('/getProductCategories', controllersProductCategory.getProductCategories)
module.exports = router;