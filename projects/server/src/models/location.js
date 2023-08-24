module.exports = (sequelize, Sequelize) => {
  const LocationModel = sequelize.define(
    "Locations",
    {
      province_id: Sequelize.STRING,
      regency_id: Sequelize.STRING,
      district_id: Sequelize.STRING,
      address: Sequelize.STRING,
      coordinate: Sequelize.STRING,
    },
    {
      paranoid: true,
    }
  );
  return LocationModel;
};
