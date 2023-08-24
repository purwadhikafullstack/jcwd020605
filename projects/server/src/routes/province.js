const express = require("express");
const router = express.Router();
const provinceController = require("../controllers").provinceController;

router.post("/addprovince", provinceController.addProvince);
router.post("/addcity", provinceController.addCity);
router.get("/:id", provinceController.getCitiesByProvinceId);
router.get("/", provinceController.getAllProvince);

module.exports = router;
