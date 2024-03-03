const db = require("./models/index.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize("front04db", "longshot", "", {
  host: "localhost",
  dialect: "postgres",
});

async function checkConnection() {
  try {
    await sequelize.authenticate();
    // sequelize.sync();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

// async function addDoe() {
//   const jane = await db["User"].create({
//     id: 1,
//     name: "Doe",
//     orders: "pizzaz",
//     role: "winner",
//   });
//   console.log(jane.name);
// }
// addDoe();
module.exports = { db, sequelize };
