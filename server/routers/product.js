const express = require('express');
const controllersProduct = require('../controllers/product');
const { verify_AccessToken, isAdmin } = require('../middlewares/verifyToken');
const fileUploader = require('../config/cloudinary.config')
const router = express.Router();

router.post('/createProduct', [verify_AccessToken, isAdmin],fileUploader.fields([
  {name : 'thumb', maxCount : 1},
  {name : 'images', maxCount : 10}
]), controllersProduct.createProduct)
router.get('/getOneProduct/:productId', controllersProduct.getOneProduct);
router.get("/getOneProductBySlug", controllersProduct.getOneProductBySlug);
router.get('/getAllProduct', controllersProduct.getAllProduct);
router.put('/updateProduct/:productId', [verify_AccessToken, isAdmin],fileUploader.fields([
  {name : 'thumb', maxCount : 1},
  {name : 'images', maxCount : 10},
]), controllersProduct.updateProduct);
router.delete('/deleteProduct/:productId', [verify_AccessToken, isAdmin], controllersProduct.deleteProduct);
router.get('/getProducts', controllersProduct.getProducts);
router.put('/ratings', verify_AccessToken, controllersProduct.ratings);
router.put('/varriant/:productId',[verify_AccessToken, isAdmin],fileUploader.fields([
  {name : 'thumb', maxCount : 1},
  {name : 'images', maxCount : 10}
]),controllersProduct.addVarriantProduct)
router.post('/uploadImagesProduct/:productId', fileUploader.fields([
  {name : 'thumb', maxCount : 1},
  {name : 'images', maxCount : 10}
]), controllersProduct.uploadImagesProduct);
module.exports = router;