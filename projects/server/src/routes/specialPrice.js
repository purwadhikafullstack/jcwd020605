const express = require("express");
const router = express.Router();

const specialPriceController = require("../controllers").specialPriceController;

router.get("/getallspecialprice", specialPriceController.getAllSpecialPrice);
router.get("/:id", specialPriceController.getSpecialPrice);
router.post("/", specialPriceController.addSPrice);
router.patch("/:id", specialPriceController.editSPrice);
router.delete("/:id", specialPriceController.deleteSprice);

module.exports = router;
