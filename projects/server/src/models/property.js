module.exports = (sequelize, Sequelize) => {
  const PropertyModel = sequelize.define(
    "Properties",
    {
      property_name: Sequelize.STRING,
      details_text: Sequelize.TEXT("long"),
      city_id: Sequelize.INTEGER,
      rating: Sequelize.INTEGER,
    },
    {
      paranoid: true,
    }
  );
  return PropertyModel;
};
