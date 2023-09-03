const { where } = require("sequelize");
const db = require("../models");
const Rooms_url = process.env.Properties_url;

const roomController = {
  getAllRoom: async (req, res) => {
    try {
      const roomData = await db.RoomModel.findAll({
        include: [
          {
            model: db.PropertyModel,
            attributes: ["property_name"],
          },
        ],
      });
      return res.status(200).send(roomData);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  addRoom: async (req, res) => {
    try {
      const { room_name, details, main_price, max_guest } = req.body;
      const { filename } = req.file;
      const imageUrl = "/room_img/" + filename;
      console.log(req.body);
      const addRooms = await db.RoomModel.create({
        room_name,
        details,
        main_price,
        max_guest,
        room_picture: imageUrl,
        room_status: "available",
        property_id: req.params.id,
      });

      return res.status(200).send({ message: "success add room" });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  editRoom: async (req, res) => {
    // const t = await db.sequelize.transaction();
    try {
      const { room_name, details, main_price, max_guest } = req.body;

      await db.RoomModel.update(
        {
          room_name,
          details,
          main_price,
          max_guest,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      return res.status(200).send({ message: "success update room" });
    } catch (err) {
      return res.status(500).send(err.message);
    }
  },

  deleteRoom: async (req, res) => {
    try {
      await db.RoomModel.destroy({
        where: {
          id: req.params.id,
        },
      });

      return res.status(200).send({
        message: "Delete room",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
};

module.exports = roomController;
