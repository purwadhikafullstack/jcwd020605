const express = require("express");
const { fileUploader } = require("../middlewares/multer");
const router = express.Router();
const propertyController = require("../controllers").propertyController;

router.get("/propertieslist", propertyController.getAllProperties);
router.get("/:id", propertyController.getPropertiesDetailById);
router.get("/", propertyController.getPropertyProv);
router.post(
  "/",
  fileUploader({
    destinationFolder: "property_img",
    fileType: "image",
  }).array("property_img", 3),
  propertyController.addProperties
);

router.patch(
  "/:id",
  fileUploader({
    destinationFolder: "property_img",
    fileType: "image",
  }).array("property_img", 3),
  propertyController.editProperties
);

router.delete("/:id", propertyController.deleteProperties);

module.exports = router;
