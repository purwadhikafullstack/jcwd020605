module.exports = (sequelize, Sequelize) => {
  const OrderModel = sequelize.define(
    "Orders",
    {
      room_id: Sequelize.INTEGER,
      user_id: Sequelize.INTEGER,
      checkin_date: Sequelize.STRING,
      checkout_date: Sequelize.STRING,
      status: Sequelize.ENUM(
        "Menunggu Pembayaran",
        "Menunggu Konfirmasi Pembayaran",
        "Diproses Tenant",
        "Dibatalkan Customer",
        "Dibatalkan Tenant"
      ),
      payment_proof: Sequelize.STRING,
      total_amount: Sequelize.INTEGER,
    },
    {
      paranoid: true,
    }
  );
  return OrderModel;
};
