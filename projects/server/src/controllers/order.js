const axios = require("axios");
const db = require("../models");
const dotenv = require("dotenv");
const API_key = process.env.API_key;
dotenv.config();

const orderController = {
  getAllOrder: async (req, res) => {
    try {
      const userOrders = await db.OrderModel.findAll();
      return res.status(200).send(userOrders);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  getAllOrderByStatus: async (req, res) => {
    try {
      const { userId, status } = req.query;
      let whereCondition = { user_id: userId };
      if (status) {
        whereCondition.status = status;
      }
      const userOrders = await db.OrderModel.findAll({
        include: [
          {
            model: db.PropertyModel,
          },
          {
            model: db.UserModel,
          },
        ],
        where: whereCondition,
      });
      return res.status(200).send(userOrders);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  addOrder: async (req, res) => {
    try {
      const {
        room_id,
        property_id,
        user_id,
        checkin_date,
        checkout_date,
        no_invoice,
      } = req.body;
      const { filename } = req.file;
      const imageUrl = "/paymentproof/" + filename;

      const order = await db.OrderModel.create({
        room_id,
        property_id,
        user_id,
        checkin_date,
        checkout_date,
        no_invoice,
        payment_proof: imageUrl,
        status: "Menunggu Pembayaran",
      });
      return res.status(200).send(order);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};

module.exports = orderController;
