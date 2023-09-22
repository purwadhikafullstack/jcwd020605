module.exports = (sequelize, Sequelize) => {
  const propertyImages = sequelize.define("PropertyImages", {
    picture: Sequelize.STRING,
  });
  return propertyImages;
};
