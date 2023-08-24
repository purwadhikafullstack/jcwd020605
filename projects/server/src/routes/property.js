const express = require("express");
const { fileUploader } = require("../middlewares/multer");
const router = express.Router();
const propertyController = require("../controllers").propertyController;

router.get("/", propertyController.getAllContent);

router.post(
  "/addproperty",
  fileUploader({
    destinationFolder: "property_img",
  }).single("property_img"),
  propertyController.addProperties
);

router.patch(
  "/editproperty/:id",
  fileUploader({
    destinationFolder: "property_img",
  }).single("property_img"),
  propertyController.editProperties
);

router.delete("/:id", propertyController.deleteProperties);

module.exports = router;
