const express = require("express");
const router = express.Router();
const tenantController = require("../controllers").tenantController;
const { fileUploader } = require("../middlewares/multer");

router.post(
  "/register",
  fileUploader({
    destinationFolder: "id_card",
  }).single("id_card"),
  tenantController.registerTenant
);

router.post("/login", tenantController.loginTenant);
router.get(
  "/token",
  tenantController.getToken,
  tenantController.getTenantByToken
);

module.exports = router;
