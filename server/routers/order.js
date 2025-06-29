const controllerOrder = require("../controllers/order");
const { verify_AccessToken, isAdmin } = require('../middlewares/verifyToken');
const express = require("express");
const router = express.Router();

router.post('/createOrder', [verify_AccessToken], controllerOrder.createOrder);
router.put('/updateStatus/:orderId', [verify_AccessToken, isAdmin], controllerOrder.updateStatus);
router.get('/getOrdersUser', [verify_AccessToken], controllerOrder.getOrdersUser);
router.get('/getOrdersAdmin', [verify_AccessToken, isAdmin], controllerOrder.getOrdersAdmin);
module.exports = router;