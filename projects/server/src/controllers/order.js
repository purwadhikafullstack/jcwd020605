const axios = require("axios");
const db = require("../models");
const dotenv = require("dotenv");
const { where, Op } = require("sequelize");
const mailer = require("../lib/mailer");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

const API_key = process.env.API_key;
dotenv.config();

const orderController = {
  getAllOrder: async (req, res) => {
    try {
      const status = req?.query?.filter?.status || "";
      const tenant_id = req?.query?.id;
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
        where: {
          [Op.and]: [whereClause, { tenant_id }],
        },
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
        tenant_id,
      } = req.body;
      let imageUrl = null;

      if (req.file && req.file.filename) {
        imageUrl = "/payment_proof/" + req.file.filename;
      }

      const order = await db.OrderModel.create({
        room_id,
        property_id,
        user_id,
        checkin_date,
        checkout_date,
        no_invoice,
        payment_proof: imageUrl,
        status,
        tenant_id,
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
        const paymentCheck = await db.OrderModel.findOne({
          where: {
            id,
          },
        });
        const value = paymentCheck?.dataValues?.payment_proof;

        if (value === null) {
          throw new Error(
            "Cannot confirm an order if there is no payment proof"
          );
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
        const order = await db.OrderModel.findOne({
          where: {
            id,
          },
        });

        if (!order) {
          return res.status(404).send("Order not found");
        }
        const imagePath = path.join(
          __dirname,
          `../public/${order?.dataValues?.payment_proof}`
        );

        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }

        await db.OrderModel.update(
          {
            status,
            payment_proof: null,
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
          throw new Error("Can't cancel when order has payment proof");
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
      console.log(error.message);
      res.status(500).send(error.message);
    }
  },
  // -----report-----
  OrderDone: async (req, res) => {
    try {
      const { id } = req.params;
      const findOrder = await db.OrderModel.findOne({
        where: { id },
      });
      if (!findOrder) {
        throw new Error("Order not found");
      } else if (
        findOrder?.dataValues?.status == "CANCELED" ||
        findOrder?.dataValues?.status == "PAYMENT"
      ) {
        throw new Error(
          "Can't complete the order if the payment status is canceled or payment."
        );
      }
      await db.OrderModel.update(
        {
          status: "DONE",
        },
        {
          where: {
            id,
          },
        }
      );
      return res.status(200).send(findOrder);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  getAllOrderDone: async (req, res) => {
    try {
      const { status, startDate, endDate } = req?.query || "";
      const { sort, order } = req?.query?.filter || "";
      let search = req?.query?.search || "";
      const page = parseInt(req?.query?.page) || 0;
      const limit = 5;
      const offset = page * limit;
      console.log(req.query);
      let where = { status };
      // default
      let orderDirection = "asc";
      if (sort === "desc") {
        orderDirection = "desc";
      }
      let orderAttribute = ["createdAt", orderDirection];
      if (order === "mainPrice") {
        orderAttribute = [db.RoomModel, "main_price", orderDirection];
      }
      let orders;
      if (sort && order) {
        orders = await db.OrderModel.findAndCountAll({
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
            status,
          },
          order: [orderAttribute],
        });
      } else if (startDate && endDate) {
        const formattedStartDate = moment(startDate)
          .startOf("day")
          .format("YYYY-MM-DDTHH:mm:ss");
        const formattedEndDate = moment(endDate)
          .endOf("day")
          .format("YYYY-MM-DDTHH:mm:ss");

        orders = await db.OrderModel.findAndCountAll({
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
            status,
            createdAt: {
              [Op.between]: [formattedStartDate, formattedEndDate],
            },
          },
        });
      } else if (search) {
        where = {
          ...where,
          [Op.or]: [
            {
              no_invoice: {
                [Op.like]: `%${search}%`,
              },
            },
            {
              "$Property.property_name$": {
                [Op.like]: `%${search}%`,
              },
            },

            {
              "$User.first_name$": {
                [Op.like]: `%${search}%`,
              },
            },
            {
              status: {
                [Op.like]: `%${search}%`,
              },
            },
            {
              createdAt: {
                [Op.like]: `%${search}%`,
              },
            },
            {
              "$Room.main_price$": {
                [Op.like]: `%${search}%`,
              },
            },
          ],
        };

        orders = await db.OrderModel.findAndCountAll({
          include: [
            {
              model: db.PropertyModel,
            },

            {
              model: db.RoomModel,
            },
            {
              model: db.UserModel,
            },
          ],
          where,
        });
      } else {
        orders = await db.OrderModel.findAndCountAll({
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
            status,
          },
          order: [orderAttribute],
        });
      }

      const ordersAndPages = orders.rows.slice(offset, limit * (page + 1));
      const totalAmount = orders.rows.reduce((prev, curr) => {
        prev += curr?.Room?.main_price;
        return prev;
      }, 0);
      res.status(200).send({
        orders: ordersAndPages,
        totalAmount,
        totalPage: Math.ceil(orders.count / limit),
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};

module.exports = orderController;
