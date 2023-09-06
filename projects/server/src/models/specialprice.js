module.exports = (sequelize, Sequelize) => {
  const SpecialPriceModel = sequelize.define("SpecialPrices", {
    room_id: Sequelize.INTEGER,
    start_date: Sequelize.DATE,
    end_date: Sequelize.DATE,
    nominal: {
      type: Sequelize.DOUBLE,
    },
    percent: {
      type: Sequelize.INTEGER,
    },
  });
  return SpecialPriceModel;
};
