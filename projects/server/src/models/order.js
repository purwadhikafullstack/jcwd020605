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
        "Menunggu Pembayaran",
        "Menunggu Konfirmasi Pembayaran",
        "Diproses Tenant",
        "Dibatalkan Customer",
        "Dibatalkan Tenant"
      ),
      payment_proof: Sequelize.STRING,
    },
    {
      paranoid: true,
    }
  );
  return OrderModel;
};
