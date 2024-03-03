module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Orders", {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
    },
    items: {
      type: DataTypes.INTEGER,
    },
  }, { timestamps: false });
};
