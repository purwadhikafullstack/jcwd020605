module.exports = (sequelize, Sequelize) => {
  const UnavailableRoomsModel = sequelize.define("Unavailables", {
    room_id: {
      type: Sequelize.INTEGER,
    },
    start_date: {
      type: Sequelize.DATE,
    },
    end_date: {
      type: Sequelize.DATE,
    },
  });
  return UnavailableRoomsModel;
};
