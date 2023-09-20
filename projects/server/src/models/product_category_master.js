module.exports = (sequelize, Sequelize) => {
  const ProductCategoriesMaster = sequelize.define(
    "productCategoryMaster",
    {
      province: Sequelize.STRING,
    },
    {
      paranoid: true,
    }
  );
  return ProductCategoriesMaster;
};
