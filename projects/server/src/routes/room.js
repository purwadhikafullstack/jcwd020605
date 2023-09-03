const express = require("express");
const router = express.Router();
const { fileUploader } = require("../middlewares/multer");

const roomController = require("../controllers").roomController;

router.get("/", roomController.getAllRoom);
router.patch("/:id", roomController.editRoom);
router.delete("/:id", roomController.deleteRoom);

router.post(
  "/:id",
  fileUploader({
    destinationFolder: "room_img",
  }).single("room_picture"),
  roomController.addRoom
);
module.exports = router;
