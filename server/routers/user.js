const controllerUser = require("../controllers/user");
const { verify_AccessToken, isAdmin } = require('../middlewares/verifyToken');
const fileUploader = require('../config/cloudinary.config')
const express = require("express");
const router = express.Router();

router.post("/register", controllerUser.register);
router.put("/accountRegister/:token_activate", controllerUser.account_register);
router.post("/accountRegisterAdmin",[verify_AccessToken, isAdmin], controllerUser.register_Admin)
router.post("/login", controllerUser.login);
router.get("/getOne", verify_AccessToken, controllerUser.getOneUser);
router.post("/refreshToken", controllerUser.refreshAccessToken);
router.post("/logout", verify_AccessToken, controllerUser.logout);
router.post('/forgotPassword', controllerUser.forgotPassword);
router.put('/resetPassword', controllerUser.resetPassword);
router.get('/getUsers', [verify_AccessToken, isAdmin], controllerUser.getUsers );
router.delete('/deleteUser', [verify_AccessToken, isAdmin], controllerUser.deleteUser);
router.put('/updateUser', verify_AccessToken, fileUploader.single('avatar'), controllerUser.updateUser);
router.put('/updateUserByAdmin/:_id', [verify_AccessToken, isAdmin], controllerUser.updateUserByAdmin);
router.put('/updateUserAddress', [verify_AccessToken, isAdmin], controllerUser.updateUserAddress);
router.put('/updateUserCart', [verify_AccessToken], controllerUser.updateUserCart);
router.delete('/removeProductInCart/:cartId', [verify_AccessToken], controllerUser.removeProductCart);
module.exports = router;
