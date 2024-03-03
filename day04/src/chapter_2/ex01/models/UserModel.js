module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Users", {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    orders: {
      type: DataTypes.INTEGER,
    },
    role: {
      type: DataTypes.STRING,
    },
  }, { timestamps: false });
};
