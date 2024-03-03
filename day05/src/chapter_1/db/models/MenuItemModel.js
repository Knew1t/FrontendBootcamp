module.exports = (sequelize, DataTypes) => {
  return sequelize.define("MenuItem", {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    picture: {
      type: DataTypes.STRING,
      // allowNull defaults to true
    },
    cost: {
      type: DataTypes.INTEGER,
      // allowNull defaults to true
    },
    callQuantity: {
      type: DataTypes.INTEGER,
    },
    description: {
      type: DataTypes.STRING,
    },
  }, { timestamps: false });
};
