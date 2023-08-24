const db = require("../models");
const bcrypt = require("bcrypt");
const nanoid = require("nanoid");
const IDCard_url = process.env.IDCard_url;
const jwt = require("jsonwebtoken");
const secretKey = "kaminari";

const tenantController = {
  registerTenant: async (req, res) => {
    try {
      const {
        first_name,
        last_name,
        email,
        password,
        phone_number,
        id_Number,
      } = req.body;
      const { filename } = req.file;
      const hashPassword = await bcrypt.hashSync(password, 10);
      const findEmail = await db.TenantModel.findOne({
        where: {
          email,
        },
      });
      const findUsername = await db.TenantModel.findOne({
        where: {
          first_name,
          last_name,
        },
      });

      if (findEmail) {
        return res.status(400).send({
          message: "Email has been used",
        });
      } else if (findUsername) {
        return res.status(400).send({
          message: "Name has been used",
        });
      }

      if (!findEmail) {
        await db.TenantModel.create({
          first_name,
          last_name,
          email,
          password: hashPassword,
          phone_number,
          id_Number,
          id_image: IDCard_url + filename,
        });
        res.status(200).send({
          message: "Succesfully create account",
        });
      } else {
        res.status(500).send({
          message: "Register Failed, please try again.",
        });
      }
    } catch (err) {
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  loginTenant: async (req, res) => {
    try {
      const { email, password } = req.body;
      const findTenant = await db.TenantModel.findOne({
        where: {
          email,
        },
      });
      if (!findTenant) {
        throw new Error("Wrong email");
      }
      const passwordCompare = bcrypt.compareSync(password, findTenant.password);
      if (passwordCompare) {
        // const payload = findTenant.dataValues.id;

        const tokenJwt = jwt.sign(
          {
            // id: payload,
            data: findTenant.dataValues,
          },
          secretKey,
          { expiresIn: "1h" }
        );

        return res.status(200).send({
          data: findTenant,
          message: "Login Success",
          token: tokenJwt,
        });
      } else {
        throw new Error("wrong password");
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({ message: err.message });
    }
  },
  getToken: async (req, res, next) => {
    try {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[0];
      // console.log(token);

      if (token == null) {
        throw new Error("token not found");
      }
      jwt.verify(token, secretKey, (err, tenant) => {
        if (err) {
          return res.status(400);
        }
        req.tenant = tenant;
        next();
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  getTenantByToken: async (req, res) => {
    try {
      delete req.tenant.data.password;
      res.send({
        tenant: req.tenant,
        message: "Succesfully Login!",
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
};

module.exports = tenantController;
