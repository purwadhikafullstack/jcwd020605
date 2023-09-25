const { where, Op } = require("sequelize");
const db = require("../models");
const reviewController = {
  addReview: async (req, res) => {
    try {
      const { review, property_id } = req.body;
      const reviewNumber = parseFloat(review);

      if (isNaN(reviewNumber) || reviewNumber < 0 || reviewNumber > 10) {
        throw new Error("Review must be a number between 1 and 10");
      }
      await db.PropertyModel.update(
        {
          rating: reviewNumber,
        },
        { where: { id: property_id } }
      );
      return res.status(200).send(`Success add review`);
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  },
  // getReviewByPropertyID: async (req, res) => {
  //   try {
  //     const { property_id } = req.query;
  //     const allReview = await db.ReviewModel.findAll({
  //       where: { property_id },
  //     });

  //     if (!allReview) {
  //       throw new Error("Review data not found");
  //     }
  //     const totalReview = allReview.reduce(
  //       (sum, reviewdata) => sum + reviewdata.review,
  //       0
  //     );
  //     const avgRate = totalReview / allReview.length;
  //     const roundedAvgRate = Math.round(avgRate * 10) / 10;
  //     return res.status(200).send(roundedAvgRate.toString());
  //   } catch (error) {
  //     console.log(error.message);
  //     res.status(500).send(error.message);
  //   }
  // },
  getReviewByPropertyID: async (req, res) => {
    try {
      const { property_id } = req.query;
      const allReview = await db.PropertyModel.findAll({
        where: { property_id },
      });

      if (!allReview) {
        throw new Error("Review data not found");
      }
      return res.status(200).send(allReview);
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
    }
  },
};

module.exports = reviewController;
