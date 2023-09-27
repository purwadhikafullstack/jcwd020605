module.exports = (sequelize, Sequelize) => {
  const UserModel = sequelize.define(
    "Users",
    {
      first_name: Sequelize.STRING,
      last_name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: Sequelize.STRING,
      phone_number: Sequelize.STRING,
      gender: Sequelize.ENUM("Male", "Female", "Other"),
      birthdate: Sequelize.STRING,
      profile_picture: Sequelize.STRING,
      is_verified: Sequelize.BOOLEAN,
    },
    {
      paranoid: true,
    }
  );
  return UserModel;
};
