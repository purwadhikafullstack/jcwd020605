module.exports = (sequelize, Sequelize) => {
  const OrderModel = sequelize.define(
    "Orders",
    {
      room_id: Sequelize.INTEGER,
      property_id: Sequelize.INTEGER,
      user_id: Sequelize.INTEGER,
      checkin_date: Sequelize.DATE,
      checkout_date: Sequelize.DATE,
      no_invoice: Sequelize.STRING,
      status: Sequelize.ENUM(
        "PAYMENT",
        "CONFIRM_PAYMENT",
        "PROCESSING",
        "CANCELED",
        "DONE"
      ),
      payment_proof: Sequelize.STRING,
    },
    {
      paranoid: true,
    }
  );
  return OrderModel;
};
