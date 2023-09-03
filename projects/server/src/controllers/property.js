const { where, Op } = require("sequelize");
const db = require("../models");
const propertyImg_url = process.env.Properties_url;

const propertyController = {
  getAllProperties: async (req, res) => {
    try {
      const pcm = req.query?.pcm || "";
      const search = req.query?.search || "";
      const whereClause = { [Op.and]: [] };
      console.log(pcm);

      if (pcm) {
        whereClause[Op.and].push({
          "$city.province$": { [Op.like]: `%${pcm}%` },
        });
      } else if (search) {
        whereClause[Op.and].push({
          [Op.or]: [
            { property_name: { [Op.like]: `%${search}%` } },
            {
              "$city.city_name$": {
                [Op.like]: `%${search}%`,
              },
            },
            {
              "$city.province$": {
                [Op.like]: `%${search}%`,
              },
            },
          ],
        });
      }

      const content = await db.PropertyModel.findAndCountAll({
        include: [
          {
            model: db.RoomModel,
            attributes: ["main_price", "room_status"],
          },

          {
            model: db.PropertyImages,
            attributes: ["picture"],
          },
          {
            model: db.CitiesModel,
          },
        ],
        where: whereClause,
      });
      const property = content.rows;
      return res.status(200).send(property);
    } catch (error) {
      return res.status(500).send({
        error: error.message,
      });
    }
  },

  getPropertiesDetailById: async (req, res) => {
    try {
      const detail = await db.PropertyModel.findOne({
        include: [
          {
            model: db.CitiesModel,
          },
          {
            model: db.RoomModel,
          },
        ],
        where: {
          id: req.params.id,
        },
      });
      return res.status(200).send(detail);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  getPropertyProv: async (req, res) => {
    try {
      const prov = await db.ProductCategoriesMaster.findAll();
      return res.status(200).send(prov);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },

  addProperties: async (req, res) => {
    const { property_name, details_text, city_id, province } = req.body;
    console.log(req.body);
    try {
      let pcm = await db.ProductCategoriesMaster.findOne({
        where: {
          province,
        },
      });

      if (!pcm) {
        pcm = await db.ProductCategoriesMaster.create({
          province,
        });
      }

      const propertyData = await db.PropertyModel.create({
        property_name,
        details_text,
        city_id: Number(city_id),
        pcm_id: pcm.id,
      });

      await propertyData.save();

      const imageArr = [];
      for (const file of req.files) {
        const { filename } = file;
        const imageUrl = "/property_img/" + filename;
        imageArr.push({ property_id: propertyData.id, picture: imageUrl });
      }

      await db.PropertyImages.bulkCreate(imageArr);

      return res.send({ message: "success add property" });
    } catch (error) {
      res.status(500).send(error);
      console.log(error);
    }
  },

  editProperties: async (req, res) => {
    // const t = await db.sequelize.transaction();
    try {
      const { property_name, details_text, city_id, province } = req.body;

      let pcm = await db.ProductCategoriesMaster.findOne({
        where: {
          province,
        },
      });

      if (!pcm) {
        pcm = await db.ProductCategoriesMaster.create({
          province,
        });

        await pcm.save();
      }
      console.log(req.body);
      //update

      await db.PropertyModel.update(
        {
          property_name,
          details_text,
          city_id: Number(city_id),
          pcm_id: pcm.id,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      if (req.files && req.files.length > 0) {
        const imageArr = [];
        for (const file of req.files) {
          const filename = file.filename;
          const imageUrl = "/property_img/" + filename;
          imageArr.push({ property_id: req.params.id, picture: imageUrl });
        }

        await db.PropertyImages.destroy({
          where: { property_id: req.params.id },
        });

        await db.PropertyImages.bulkCreate(imageArr);
      }
      return res.status(200).send({ message: "success update property" });
    } catch (err) {
      console.log(err);
      return res.status(500).send(err.message);
    }
  },

  deleteProperties: async (req, res) => {
    try {
      await db.PropertyModel.destroy({
        where: {
          id: req.params.id,
        },
      });
      await db.PropertyImages.destroy({
        where: {
          property_id: req.params.id,
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
