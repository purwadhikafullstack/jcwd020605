module.exports = (sequelize, Sequelize) => {
  const ReviewModel = sequelize.define(
    "Reviews",
    {
      review: Sequelize.INTEGER,
    },
    {
      paranoid: true,
    }
  );
  return ReviewModel;
};
