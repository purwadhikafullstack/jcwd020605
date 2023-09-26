const express = require("express");
const router = express.Router();
const reviewController = require("../controllers").reviewController;

router.get("/reviewdata", reviewController.getReviewByPropertyID);
router.patch("/addreview", reviewController.addReview);

module.exports = router;
