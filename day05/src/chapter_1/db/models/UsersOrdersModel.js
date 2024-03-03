module.exports = (sequelize, DataTypes) => {
  return sequelize.define("UsersOrders", {}, { timestamps: false });
};
