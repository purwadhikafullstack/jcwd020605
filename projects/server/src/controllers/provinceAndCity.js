const axios = require("axios");
const db = require("../models");
const dotenv = require("dotenv");
const API_key = process.env.API_key;
dotenv.config();

const provinceController = {
  addProvince: async (req, res) => {
    try {
      const response = await axios.get(
        "https://api.rajaongkir.com/starter/province",
        {
          headers: {
            key: API_key,
          },
        }
      );
      console.log(response.data.rajaongkir);
      await db.ProvinceModel.bulkCreate(response.data.rajaongkir.results);
      return res.status(200).send(response.data.rajaongkir.results);
    } catch (error) {
      res.status(500).send({
        messsage: "Internal server error",
        error: error,
      });
    }
  },
  addCity: async (req, res) => {
    try {
      const response = await axios.get(
        "https://api.rajaongkir.com/starter/city",
        {
          headers: {
            key: API_key,
          },
        }
      );
      console.log(response.data.rajaongkir);
      await db.CitiesModel.bulkCreate(response.data.rajaongkir.results);
      return res.status(200).send(response.data.rajaongkir.results);
    } catch (error) {
      res.status(500).send({
        messsage: error.message,
      });
    }
  },
  getCitiesByProvinceId: async (req, res) => {
    try {
      const province = await db.ProvinceModel.findOne({
        include: [db.CitiesModel],
        where: { province_id: req.params.id },
      });
      return res.send(province);
    } catch (error) {
      res.status(500).send({
        messsage: error.message,
      });
    }
  },
  getAllProvince: async (req, res) => {
    try {
      const allProvince = await db.ProvinceModel.findAll({
        include: [db.CitiesModel],
      });
      return res.send(allProvince);
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  },
};

module.exports = provinceController;
