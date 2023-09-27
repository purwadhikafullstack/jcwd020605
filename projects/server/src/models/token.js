module.exports = (sequelize, Sequelize) => {
  const TokenModel = sequelize.define("Tokens", {
    token: Sequelize.STRING,
    action: Sequelize.ENUM("VERIFICATION", "FORGET PASSWORD"),
    payload: Sequelize.STRING,
    expired: Sequelize.DATE,
    valid: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  });
  return TokenModel;
};
