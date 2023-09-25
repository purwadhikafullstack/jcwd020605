const { where, Op } = require("sequelize");
const db = require("../models");

const roomController = {
  getAllRoom: async (req, res) => {
    try {
      const tenant_id = req?.query?.id || "";
      const property_id = req?.query?.propertyId || "";
      console.log(req.query);
      let page = req.query.page || 0;
      const limit = 5;
      const offset = limit * page;
      const roomDataList = await db.RoomModel.findAll({});
      const roomAvailable = await db.RoomModel.findAll({
        where: { room_status: "available" },
      });
      const roomUnavailable = await db.RoomModel.findAll({
        where: { room_status: "unavailable" },
      });

      if (property_id === "") {
        const roomData = await db.RoomModel.findAll({
          include: [
            {
              model: db.PropertyModel,
            },
          ],
          where: {
            tenant_id,
          },
          limit,
          offset,
        });

        return res.status(200).send({
          roomData,
          roomAvailable,
          roomUnavailable,
          totalPage: Math.ceil(roomDataList.length / limit),
        });
      } else if (property_id) {
        const roomData = await db.RoomModel.findAll({
          include: [
            {
              model: db.PropertyModel,
            },
          ],
          where: {
            [Op.and]: [{ property_id }, { tenant_id }],
          },
          limit,
          offset,
        });

        return res.status(200).send({
          roomData,
          roomAvailable,
          roomUnavailable,
          totalPage: Math.ceil(roomDataList.length / limit),
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  getAllRoomById: async (req, res) => {
    try {
      const roomData = await db.RoomModel.findOne({
        include: [
          {
            model: db.PropertyModel,
            attributes: ["property_name"],
          },
        ],
        where: {
          id: req.params.id,
        },
      });
      return res.status(200).send(roomData);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  addRoom: async (req, res) => {
    try {
      const { room_name, details, main_price, max_guest, tenant_id } = req.body;
      const { filename } = req.file;
      const imageUrl = "/room_img/" + filename;
      const addRooms = await db.RoomModel.create({
        room_name,
        details,
        main_price,
        max_guest,
        room_picture: imageUrl,
        room_status: "available",
        property_id: req.params.id,
        tenant_id,
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
  getRoomByPropertyId: async (req, res) => {
    try {
      const property_id = req.params.id;
      const Room = await db.RoomModel.findAll({
        where: { property_id },
      });
      return res.status(200).send(Room);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = roomController;
