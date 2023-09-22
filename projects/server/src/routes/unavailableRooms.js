const express = require("express");
const router = express.Router();

const unavailableRoomsController =
  require("../controllers").unavailableRoomsController;

router.get("/:id", unavailableRoomsController.getUnavailability);
router.post("/", unavailableRoomsController.addUnavailability);

module.exports = router;
