const express = require("express");
const router = express.Router();
const { fileUploader } = require("../middlewares/multer");
const orderController = require("../controllers").orderController;

router.get("/orderbystatus", orderController.getAllOrderByStatus);
router.get("/", orderController.getAllOrder);

router.post(
  "/addorder",
  fileUploader({
    destinationFolder: "payment_proof",
  }).single("payment_proof"),
  orderController.addOrder
);
module.exports = router;
