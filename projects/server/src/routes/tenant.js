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
router.post("/forgetpassword", tenantController.forgetPassword);
router.get(
  "/token",
  tenantController.getToken,
  tenantController.getTenantByToken
);
router.get("/tenantbyid/:id", tenantController.getTenantById);
router.patch(
  "/resetpassword",
  tenantController.getTokenReset,
  tenantController.resetPassword
);
router.patch(
  "/editprofile/:id",
  fileUploader({
    destinationFolder: "profile_picture",
  }).single("profile_picture"),
  tenantController.editProfile
);
module.exports = router;
