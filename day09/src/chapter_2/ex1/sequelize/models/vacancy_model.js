const { DataTypes } = require("sequelize");
// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
  sequelize.define("vacancy", {
    // The following specification of the 'id' attribute could be omitted
    // since it is the default.
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    english_level: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    grade: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    contacts: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    tags: {
      allowNull: true,
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    isActive: {
      type: DataTypes.BOOLEAN,
    },
  });
};
