const axios = require("axios");
const db = require("../models");
const dotenv = require("dotenv");
const { where, Op } = require("sequelize");
const mailer = require("../lib/mailer");

const API_key = process.env.API_key;
dotenv.config();

const orderController = {
  getAllOrder: async (req, res) => {
    try {
      const status = req?.query?.status || "";
      const whereClause = { [Op.and]: [] };
      const page = parseInt(req?.query?.page) || 0;
      const limit = 5;
      const offset = page * limit;

      if (status) {
        whereClause[Op.and].push({
          status,
        });
      }
      const content = await db.OrderModel.findAndCountAll({
        include: [
          {
            model: db.PropertyModel,
          },
          {
            model: db.UserModel,
          },
        ],
        where: whereClause,
        distinct: true,
      });
      const userOrders = content.rows.slice(offset, limit * (page + 1));

      return res.status(200).send({
        userOrders: userOrders,
        totalPage: Math.ceil(content.count / limit),
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  getOrderById: async (req, res) => {
    try {
      const { id } = req.params;
      const orderById = await db.OrderModel.findOne({
        include: [
          {
            model: db.PropertyModel,
          },
          {
            model: db.UserModel,
          },
          {
            model: db.RoomModel,
          },
        ],
        where: {
          id,
        },
      });
      return res.status(200).send(orderById);
    } catch (error) {
      console.log(error);
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
      console.log(whereCondition);
      const userOrders = await db.OrderModel.findAll(
        {
          include: [
            {
              model: db.PropertyModel,
            },
            {
              model: db.UserModel,
            },
          ],
        },
        { where: whereCondition.status }
      );
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
        status,
      } = req.body;
      const { filename } = req.file;
      const imageUrl = "/payment_proof/" + filename;

      const order = await db.OrderModel.create({
        room_id,
        property_id,
        user_id,
        checkin_date,
        checkout_date,
        no_invoice,
        payment_proof: imageUrl,
        status,
      });
      return res.status(200).send(order);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  confirmOrReject: async (req, res) => {
    try {
      const { status, id } = req.body;
      let message = "";
      if (status === "PROCESSING") {
        await db.OrderModel.update(
          {
            status,
          },
          {
            where: {
              id,
            },
          },
          (message = "Confirmed success")
        );

        const email = await db.OrderModel.findOne({
          include: [{ model: db.UserModel }],
          where: { id },
        });

        await mailer({
          subject: "Hotel Rules",
          to: email?.User?.dataValues?.email,
          text: `
          Dear ${email?.User?.dataValues?.first_name},


          To ensure a pleasant and comfortable stay for everyone, we kindly ask you to abide by the following rules:
          1. Hotel rooms are rented for hotel days.
          2. A hotel day starts at 2:00 p.m. on the day of arrival and ends at 12:00 a.m. of the following day. Failure to check out by 12:00 p.m. will result in an additional fee for extending a hotel day. A charge for the extension until 4:00 
             p.m. amounts to PLN 80.00, after 4:00 p.m. the hotel will charge for an additional hotel day.
          3. The hotel reserves the right to pre-authorize your credit card upon check-in or collect a fee for the entire stay in the form of a cash deposit. 
          4. In case the guest fails to appear in the hotel by 6 p.m. of the accommodation day despite making a reservation, the fee for the room shall be charged by the hotel.
          5. The hotel guest cannot hand over a room to third persons, even if the period for which the guest paid has not yet expired.
          6. Persons who are not checked in the hotel may stay in a hotel room from 07:00 a.m. till 10:00 p.m. Persons staying in a room after 10:00 p.m. must check in the hotel.
          7. The hotel may refuse to accept the guests who grossly violated the Hotel Rules and Regulations during the last stay by damaging the hotel's or guests' property or by inflicting damage on other guests, hotel employees 
             or other persons staying in the hotel or in other way violated the stay of other guests or the functioning of the hotel.
          8. The hotel accepts guests traveling with pets. Only one pet is allowed per room for an extra charge and the guest bears full responsibility for any damage caused by their pet. Pets must be leashed in common areas.
             Due to hygienic reasons, pets are not allowed in the hotel restaurant.

          Thank you for choosing our property as your accommodation.

          
          Best regards,
          The CAPPA
          `,
        });
      } else if (status === "PAYMENT") {
        await db.OrderModel.update(
          {
            status,
          },
          {
            where: {
              id,
            },
          },
          (message = "Rejected success")
        );
      } else if (status === "CANCELED") {
        const paymentCheck = await db.OrderModel.findOne({
          where: {
            id,
          },
        });
        const value = paymentCheck?.dataValues?.payment_proof;

        if (value !== null) {
          throw new Error("can't cancel when order has been paid");
        }

        await db.OrderModel.update(
          {
            status,
          },
          {
            where: {
              id,
            },
          },
          (message = "Cancel success")
        );
      }
      return res.status(200).send(message);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};

module.exports = orderController;
