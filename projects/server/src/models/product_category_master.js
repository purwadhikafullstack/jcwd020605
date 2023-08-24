module.exports = (sequelize, Sequelize) => {
  const ProductCategoriesMaster = sequelize.define(
    "productCategoryMaster",
    {
      city_id: Sequelize.INTEGER,
    },
    {
      paranoid: true,
    }
  );
  return ProductCategoriesMaster;
};
