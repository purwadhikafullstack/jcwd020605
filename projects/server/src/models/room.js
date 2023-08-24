module.exports = (sequelize, Sequelize) => {
  const RoomModel = sequelize.define(
    "Rooms",
    {
      room_name: Sequelize.STRING,
      details: Sequelize.TEXT("long"),
      max_guest: Sequelize.STRING,
      room_photos: Sequelize.STRING,
      main_price: Sequelize.STRING,
    },
    {
      paranoid: true,
    }
  );
  return RoomModel;
};
