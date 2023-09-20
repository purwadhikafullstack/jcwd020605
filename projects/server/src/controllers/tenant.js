const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "kaminari";
const mailer = require("../lib/mailer");
const moment = require("moment");

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
          id_image: "/id_card/" + filename,
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
        const payload = findTenant.dataValues.id;
        console.log(payload);
        const tokenJwt = jwt.sign(
          {
            id: payload,
            data: findTenant.dataValues,
          },
          secretKey
        );
        console.log(tokenJwt);

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
      let token = req.headers.authorization;
      if (token == null) {
        throw new Error("token not found");
      }
      jwt.verify(token, secretKey, (err, tenant) => {
        if (err) {
          throw new Error("Token not found");
        }
        req.tenant = tenant;
      });
      next();
    } catch (err) {
      console.log(err.message);
      res.status(500).send(err.message);
    }
  },
  getTenantByToken: async (req, res) => {
    try {
      delete req.tenant.data.password;
      res.status(200).send({
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
  forgetPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const tenant = await db.TenantModel.findOne({
        where: {
          email,
        },
      });
      if (!tenant) {
        throw new Error("Cannot find email");
      }
      const payload = tenant.dataValues.id;
      const tokenJwt = jwt.sign(
        {
          data1: tenant.dataValues.id,
          data2: tenant.dataValues.email,
        },
        secretKey,
        { expiresIn: "5m" }
      );
      const token = await db.TokenModel.create({
        expired: moment().add(5, "day").format(),
        token: tokenJwt,
        payload: JSON.stringify({ id: payload }),
        action: "FORGET PASSWORD",
      });
      console.log(token);
      mailer({
        subject: "Reset Password (5 min expired)",
        to: tenant.dataValues.email,
        text: "http://localhost:3000/resetPassword/" + token.dataValues.token,
      });
      return res.status(200).send({ message: "We've send an email to you" });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  getTokenReset: async (req, res, next) => {
    try {
      const token = req.query.token;
      console.log(req.query.token);
      console.log(req.query);

      if (token == null) {
        throw new Error("token not found");
      }
      jwt.verify(token, secretKey, (err, tenant) => {
        if (err) {
          throw new Error("Token expired");
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
  resetPassword: async (req, res) => {
    try {
      let token = req.query.token;
      const { password, confirm } = req.body;
      const id = req.tenant.data1;
      const hashPassword = await bcrypt.hashSync(password, 10);
      console.log(token);
      console.log(req.body);
      if (password !== confirm) {
        throw new Error("Password doesn't match");
      }
      await db.TenantModel.update(
        {
          password: hashPassword,
        },
        {
          where: {
            id,
          },
        }
      );
      const check = await db.TokenModel.findOne({
        where: {
          token,
          valid: true,
        },
      });

      if (!check) {
        throw new Error("Token has been used before");
      }
      await db.TokenModel.update(
        {
          valid: false,
        },
        {
          where: {
            token,
          },
        }
      );
      return res.send({ message: "Reset password succesfully, arigatou!" });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: error.message,
      });
    }
  },
};

module.exports = tenantController;
