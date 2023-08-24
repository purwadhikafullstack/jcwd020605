module.exports = (sequelize, Sequelize) => {
  const SpecialPriceModel = sequelize.define("SpecialPrices", {
    room_id: Sequelize.INTEGER,
    start_date: Sequelize.STRING,
    end_date: Sequelize.STRING,
    nominal: {
      type: Sequelize.INTEGER,
    },
    percent: {
      type: Sequelize.INTEGER,
    },
  });
  return SpecialPriceModel;
};
