module.exports = (sequelize, DataTypes) => {
  return sequelize.define("OrdersMenu", {}, { timestamps: false });
};
