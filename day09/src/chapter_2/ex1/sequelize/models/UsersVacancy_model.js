const sequelize = require("sequelize");
module.exports = (sequelize) => {
  return sequelize.define("UsersVacancy", {}, { timestamps: false });
};
