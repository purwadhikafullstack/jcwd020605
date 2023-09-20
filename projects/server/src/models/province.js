module.exports = (sequelize, Sequelize) => {
  const ProvinceModel = sequelize.define(
    "provinces",
    {
      province_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      province: {
        type: Sequelize.STRING,
      },
    },
    {
      paranoid: true,
    }
  );
  return ProvinceModel;
};
