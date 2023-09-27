module.exports = (sequelize, Sequelize) => {
  const TenantModel = sequelize.define(
    "Tenants",
    {
      first_name: Sequelize.STRING,
      last_name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
      phone_number: Sequelize.STRING,
      id_Number: Sequelize.STRING,
      id_image: Sequelize.STRING,
      profile_picture: Sequelize.STRING,
      is_verified: Sequelize.BOOLEAN,
    },
    {
      paranoid: true,
    }
  );
  return TenantModel;
};
