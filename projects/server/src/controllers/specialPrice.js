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

const specialPriceController = {
  getSpecialPrice: async (req, res) => {
    try {
      let room_id = req.params.id;
      let data = await db.SpecialPriceModel.findAll({
        attributes: [
          ["room_id", "id"],
          [sequelize.literal("DATE_FORMAT(start_date, '%Y-%m-%d')"), "start"],
          [sequelize.literal("DATE_FORMAT(end_date, '%Y-%m-%d')"), "end"],
          "nominal",
          "percent",
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
  addSPrice: async (req, res) => {
    try {
      let { room_id, start_date, end_date, nominal, percent } = req.body;

      //check ada gak di table based between tanggal
      let SP_Check = await db.SpecialPriceModel.findAll({
        where: {
          room_id,
          [Op.or]: [
            {
              start_date: {
                [Op.between]: [start_date, end_date],
              },
              end_date: {
                [Op.between]: [start_date, end_date],
              },
            },
          ],
        },
      });

      //compare antara data yang di input dgn yang ada di table
      let SP_Data = await db.SpecialPriceModel.findAll({
        where: {
          room_id,
        },
      });

      let SP_DataCompare = SP_Data.find(
        (val) =>
          val.start_date <= new Date(start_date) &&
          new Date(start_date <= val.end_date) &&
          val.start_date <= new Date(end_date) &&
          new Date(end_date) <= val.end_date
      );

      //check status unavailable room based between tanggal
      let UnavailableRoomCheck = await db.UnavailableRoomsModel.findAll({
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

      let UnavailableRoomData = await db.UnavailableRoomsModel.findAll({
        where: {
          room_id,
        },
      });
      let UnavailableRoomDataCompare = UnavailableRoomData.find(
        (val) =>
          val.start_date <= new Date(start_date) &&
          new Date(start_date) <= val.end_date &&
          val.start_date <= new Date(end_date) &&
          new Date(end_date) <= val.end_date
      );

      //condition false
      if (SP_Check.length > 0 || SP_DataCompare) {
        return res.status(200).send({
          success: false,
          message: "The dates already set by special prices",
        });
      } else if (UnavailableRoomCheck.length > 0 || UnavailableRoomDataCompare)
        return res.status(200).send({
          success: false,
          message: "The dates already set by unavailable rooms",
        });

      await db.SpecialPriceModel.create({
        room_id,
        start_date,
        end_date,
        nominal,
        percent,
      });
      return res.status(200).send({
        success: true,
        message: "Successfully set special price",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  editSPrice: async (req, res) => {
    try {
      let { start_date, end_date, nominal, percent } = req.body;
      await db.SpecialPriceModel.update(
        {
          start_date,
          end_date,
          nominal,
          percent,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      return res.status(200).send({
        success: true,
        message: "Success update special price data",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  deleteSprice: async (req, res) => {
    try {
      await db.SpecialPriceModel.destroy({
        where: {
          id: req.params.id,
        },
      });
      return res.status(200).send({
        success: true,
        message: "Success delete data",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
};

module.exports = specialPriceController;
