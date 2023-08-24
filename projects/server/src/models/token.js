module.exports = (sequelize, Sequelize) => {
  const TokenModel = sequelize.define("Tokens", {
    user_id: Sequelize.INTEGER,
    otp: Sequelize.INTEGER,
    action: Sequelize.ENUM("Verification", "Change Password"),
    is_used: Sequelize.BOOLEAN,
    payload: Sequelize.STRING,
  });
  return TokenModel;
};
