module.exports = (sequelize, Sequelize) => {
  const PropertyModel = sequelize.define(
    "Properties",
    {
      property_name: Sequelize.STRING,
      details_text: Sequelize.TEXT("long"),
      // property_photos: Sequelize.STRING,
    },
    {
      paranoid: true,
    }
  );
  return PropertyModel;
};
