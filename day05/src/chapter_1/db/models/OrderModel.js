module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Orders", {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
    },
  }, { timestamps: false });
};
