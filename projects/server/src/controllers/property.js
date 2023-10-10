const { where, Op } = require("sequelize");
const db = require("../models");

const propertyController = {
  getAllProperties: async (req, res) => {
    try {
      const pcm = req?.query?.filter?.pcm || "";
      const search = req?.query?.filter?.search || "";
      const tenant_id = req?.query?.id || "";
      const whereClause = { [Op.and]: [] };
      const page = parseInt(req?.query?.page) || 0;
      const limit = 5;
      const offset = page * limit;

      if (pcm) {
        whereClause[Op.and].push({
          "$City.province$": { [Op.like]: `%${pcm}%` },
        });
      } else if (search) {
        whereClause[Op.and].push({
          [Op.or]: [
            { property_name: { [Op.like]: `%${search}%` } },
            {
              "$City.city_name$": {
                [Op.like]: `%${search}%`,
              },
            },
            {
              "$City.province$": {
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
        where: {
          [Op.and]: [whereClause, { tenant_id }],
        },
        distinct: true,
      });
      const property = content.rows.slice(offset, limit * (page + 1));
      console.log(property.length);

      return res.status(200).send({
        property: property,
        totalPage: Math.ceil(content.count / limit),
      });
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
      const prov = await db.ProductCategoriesMaster.findAll({
        where: { tenant_id: req.params.id },
      });
      return res.status(200).send(prov);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  addProperties: async (req, res) => {
    const { property_name, details_text, city_id, province, tenant_id } =
      req.body;
    try {
      let pcm = await db.ProductCategoriesMaster.findOne({
        where: {
          [Op.and]: [{ province }, { tenant_id }],
        },
      });

      if (!pcm) {
        pcm = await db.ProductCategoriesMaster.create({
          province,
          tenant_id,
        });
      }

      const propertyData = await db.PropertyModel.create({
        property_name,
        details_text,
        city_id: Number(city_id),
        pcm_id: pcm.id,
        tenant_id,
      });

      await propertyData.save();

      pcm = await db.ProductCategoriesMaster.update(
        {
          property_id: propertyData?.dataValues?.id,
        },
        {
          where: {
            id: propertyData?.dataValues?.pcm_id,
          },
        }
      );

      const imageArr = [];
      for (const file of req.files) {
        const { filename } = file;
        const imageUrl = "/property_img/" + filename;
        imageArr.push({ property_id: propertyData.id, picture: imageUrl });
      }

      await db.PropertyImages.bulkCreate(imageArr);

      return res.send({ message: "Success add property" });
    } catch (error) {
      res.status(500).send(error);
      console.log(error);
    }
  },
  editProperties: async (req, res) => {
    try {
      const { property_name, details_text, city_id, province, tenant_id } =
        req.body;

      console.log(req.body.province);

      if (req.body.province === "undefined") {
        throw new Error("Please select your property province and city");
      }
      const property_id = req?.params?.id;
      const prevPcm = await db.ProductCategoriesMaster.findOne({
        where: { property_id },
      });

      if (prevPcm) {
        await db.ProductCategoriesMaster.destroy({
          where: { property_id },
        });
      }

      let pcm = await db.ProductCategoriesMaster.findOne({
        where: {
          [Op.and]: [{ province }, { tenant_id }],
        },
      });

      if (!pcm) {
        pcm = await db.ProductCategoriesMaster.create({
          province,
          tenant_id,
          property_id,
        });

        await pcm.save();
      }
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
      await db.ProductCategoriesMaster.destroy({
        where: {
          property_id: req.params.id,
        },
      });
      await db.RoomModel.destroy({
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
  getPropertiesLength: async (req, res) => {
    try {
      const { tenant_id } = req.query;
      const find = await db.PropertyModel.findAll({
        where: { tenant_id },
      });
      console.log(find.length);
      return res.status(200).send(find);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
};

module.exports = propertyController;
