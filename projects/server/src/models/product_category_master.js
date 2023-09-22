module.exports = (sequelize, Sequelize) => {
  const ProductCategoriesMaster = sequelize.define(
    "ProductCategoryMaster",
    {
      province: Sequelize.STRING,
    },
    {
      paranoid: true,
    }
  );
  return ProductCategoriesMaster;
};
