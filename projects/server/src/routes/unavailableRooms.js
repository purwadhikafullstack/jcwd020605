const express = require("express");
const router = express.Router();

const unavailableRoomsController =
  require("../controllers").unavailableRoomsController;

router.get("/getallunavailable", unavailableRoomsController.getAllUnavailable);
router.get("/:id", unavailableRoomsController.getUnavailability);
router.post("/", unavailableRoomsController.addUnavailability);
router.delete("/:id", unavailableRoomsController.deleteUnavailability);

module.exports = router;
