const propertyRoutes = require("./property");
const tenantRoutes = require("./tenant");
const provinceRoutes = require("./province");
const roomRoutes = require("./room");
const specialPriceRoutes = require("./specialPrice");
const unavailableRoomsRoutes = require("./unavailableRooms");
const orderRoutes = require("./order");

module.exports = {
  propertyRoutes,
  provinceRoutes,
  tenantRoutes,
  roomRoutes,
  specialPriceRoutes,
  unavailableRoomsRoutes,
  orderRoutes,
};
