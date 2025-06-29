const controllersBrand = require("../controllers/brand");
const { verify_AccessToken } = require("../middlewares/verifyToken");
const express = require("express");
const router = express.Router();

router.post("/createBrand",[verify_AccessToken], controllersBrand.createBrand);
router.put("/updateBrand/:brandId", [verify_AccessToken], controllersBrand.updateBrand);
router.get("/getBrands", controllersBrand.getBrands);
router.get("/getBrand/:brandId", controllersBrand.getBrand);
router.delete("/deleteBrand/:brandId",[verify_AccessToken], controllersBrand.deleteBrand);

module.exports = router;
