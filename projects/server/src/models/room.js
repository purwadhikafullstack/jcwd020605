module.exports = (sequelize, Sequelize) => {
  const RoomModel = sequelize.define(
    "Rooms",
    {
      room_name: Sequelize.STRING,
      details: Sequelize.TEXT("long"),
      main_price: Sequelize.STRING,
      max_guest: Sequelize.STRING,
      room_picture: Sequelize.STRING,
      room_status: Sequelize.ENUM("available", "unavailable"),
    },
    {
      paranoid: true,
    }
  );
  return RoomModel;
};
