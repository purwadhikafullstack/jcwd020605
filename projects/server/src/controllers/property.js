const { where } = require("sequelize");
const db = require("../models");
const propertyImg_url = process.env.Properties_url;

const propertyController = {
  getAllContent: async (req, res) => {
    try {
      const content = await db.PropertyModel.findAll({
        include: [
          {
            model: db.RoomModel,
            attributes: ["main_price"],
          },
        ],
      });
      return res.status(200).send(content);
    } catch (error) {
      return res.status(500).send({
        error: error.message,
      });
    }
  },
  addProperties: async (req, res) => {
    const { property_name, details_text, pcm_id, room_id } = req.body;
    const { filename } = req.file;

    try {
      const propertyData = await db.PropertyModel.create({
        property_name,
        details_text,
        pcm_id,
        room_id,
      });

      const imageArr = [];
      const image_url = propertyImg_url + filename;
      imageArr.push({
        property_id: propertyData.id,
        picture: image_url,
      });
      console.log(imageArr);

      await db.PropertyImages.bulkCreate(imageArr);

      return res.send({ message: "success add property" });
    } catch (error) {
      res.status(500).send(error);
      console.log(error);
    }
  },
  editProperties: async (req, res) => {
    const { property_name, details_text, pcm_id, room_id } = req.body;
    const { filename } = req.file;

    try {
      const propertyData = await db.PropertyModel.update(
        {
          property_name,
          details_text,
          pcm_id,
          room_id,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      const imageArr = [];
      const image_url = propertyImg_url + filename;
      imageArr.push({
        property_id: propertyData.id,
        picture: image_url,
      });

      await db.PropertyImages.update(
        { imageArr },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return res.send({ message: "success edit property" });
    } catch (error) {
      console.log(error.message);
      res.status(500).send(error);
    }
  },
  deleteProperties: async (req, res) => {
    try {
      await db.PropertyModel.destroy({
        where: {
          id: req.params.id,
        },
      });
      return res.status(200).send({
        message: "Delete Property",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
};

module.exports = propertyController;
