const express = require("express");
const router = express.Router();
const controllerInsert = require("../controllers/insertData");

router.post("/insertProducts", controllerInsert.insertProducts);
router.post("/insertProductCategory", controllerInsert.insertProductCategory);
module.exports = router;