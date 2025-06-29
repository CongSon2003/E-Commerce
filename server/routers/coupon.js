const express = require('express');
const router = express.Router();
const controllersCoupon = require('../controllers/coupon');
const { verify_AccessToken, isAdmin } = require('../middlewares/verifyToken');

router.post('/createCoupon', [verify_AccessToken, isAdmin], controllersCoupon.createCoupon);
router.put('/updateCoupon/:couponId', verify_AccessToken, controllersCoupon.updateCoupon);
router.get('/getCoupon/:couponId', verify_AccessToken, controllersCoupon.getCoupon);
router.get('/getCoupons', controllersCoupon.getCoupons);
router.delete('/deleteCoupon/:couponId', verify_AccessToken, controllersCoupon.deleteCoupon);

module.exports = router