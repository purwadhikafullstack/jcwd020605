module.exports = (sequelize, Sequelize) => {
  const propertyImages = sequelize.define("propertyImages", {
    picture: Sequelize.STRING,
  });
  return propertyImages;
};
