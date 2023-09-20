module.exports = (sequelize, Sequelize) => {
  const ReviewModel = sequelize.define(
    "Reviews",
    {
      user_id: Sequelize.INTEGER,
      room_id: Sequelize.INTEGER,
      stars: Sequelize.INTEGER,
      remarks: Sequelize.TEXT("long"),
    },
    {
      paranoid: true,
    }
  );
  return ReviewModel;
};
