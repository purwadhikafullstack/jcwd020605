const { where, Op } = require("sequelize");
const db = require("../models");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    dialect: config.dialect,
  }
);

const unavailableRoomsController = {
  addUnavailability: async (req, res) => {
    try {
      let { room_id, start_date, end_date } = req.body;

      //check ada gak di table based between tanggal
      let unavailableRoomCheck = await db.UnavailableRoomsModel.findAll({
        where: {
          room_id,
          [Op.or]: [
            {
              start_date: {
                [Op.between]: [start_date, end_date],
              },
            },
            {
              end_date: {
                [Op.between]: [start_date, end_date],
              },
            },
          ],
        },
      });

      //compare antara data yang di input dgn yang ada di table
      let unavailableData = await db.UnavailableRoomsModel.findAll({
        where: {
          room_id,
        },
      });
      let unavailableDataCompare = unavailableData.find(
        (val) =>
          val.start_date <= new Date(start_date) &&
          new Date(start_date) <= val.end_date &&
          val.start_date <= new Date(end_date) &&
          new Date(end_date) <= val.end_date
      );

      //cek apakah tanggal yg di input ada special price event atau tidak
      let SP_Check = await db.SpecialPriceModel.findAll({
        where: {
          room_id,
          [Op.or]: [
            {
              start_date: {
                [Op.between]: [start_date, end_date],
              },
            },
            {
              end_date: {
                [Op.between]: [start_date, end_date],
              },
            },
          ],
        },
      });

      let SP_Data = await db.SpecialPriceModel.findAll({
        where: {
          room_id,
        },
      });
      let SP_DataCompare = SP_Data.find(
        (val) =>
          val.start_date <= new Date(start_date) &&
          new Date(start_date) <= val.end_date &&
          val.start_date <= new Date(end_date) &&
          new Date(end_date) <= val.end_date
      );

      //condition false
      if (unavailableRoomCheck.length > 0 || unavailableDataCompare) {
        return res.status(200).send({
          success: false,
          message: "The dates already set by Unavailable status",
        });
      } else if (SP_Check.length > 0 || SP_DataCompare) {
        return res.status(200).send({
          success: false,
          message: "The dates has been assigned with special price",
        });
      }

      await db.UnavailableRoomsModel.create({
        room_id,
        start_date,
        end_date,
      });
      return res.status(200).send({
        success: true,
        message: "Successfully set Unavailability",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  getUnavailability: async (req, res) => {
    try {
      let room_id = req.params.id;

      let data = await db.UnavailableRoomsModel.findAll({
        attributes: [
          ["room_id", "id"],
          [sequelize.literal("DATE_FORMAT(start_date, '%Y-%m-%d')"), "start"],
          [sequelize.literal("DATE_FORMAT(end_date, '%Y-%m-%d')"), "end"],
        ],
        where: {
          room_id,
        },
      });

      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
};

module.exports = unavailableRoomsController;
