const express = require("express");
const router = express.Router();

const unavailableRoomsController =
  require("../controllers").unavailableRoomsController;

router.get("/:id", unavailableRoomsController.getUnavailability);
router.post("/", unavailableRoomsController.addUnavailability);

// router.patch("/:id", unavailableRoomsController.editSPrice);
// router.delete("/:id", unavailableRoomsController.deleteSprice);

module.exports = router;
