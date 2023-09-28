// require("dotenv/config");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const { join } = require("path");
const db = require("./models");
const routes = require("./routes");

const PORT = process.env.PORT || 8000;
const app = express();

// db.sequelize.sync({ alter: true });

app.use(cors());

app.use(express.json());

//#region API ROUTES

// ===========================
// NOTE : Add your routes here

app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  });
});

app.use("/api/properties", routes.propertyRoutes);
app.use("/api/provincelist", routes.provinceRoutes);
app.use("/api/tenant", routes.tenantRoutes);
app.use("/api/room", routes.roomRoutes);
app.use("/api/specialprice", routes.specialPriceRoutes);
app.use("/api/unavailableroom", routes.unavailableRoomsRoutes);
app.use("/api/order", routes.orderRoutes);
app.use("/api/review", routes.reviewRoutes);
app.use("/api/id_card", express.static(`${__dirname}/public/id_card`));

app.use(
  "/api/property_img",
  express.static(`${__dirname}/public/property_img`)
);
app.use("/api/room_img", express.static(`${__dirname}/public/room_img`));
app.use(
  "/api/payment_proof",
  express.static(`${__dirname}/public/payment_proof`)
);
app.use(
  "/api/profile_picture",
  express.static(`${__dirname}/public/profile_picture`)
);
// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
