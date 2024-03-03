const { models } = require('../../sequelize');
//TODO: GET /my-vacancies
//
//  GET /vacancies
async function getAll(req, res) {
  console.log("inside ogin route");
  const vacancies = await models.vacancy.findAll();
  res.status(200).json(vacancies);
  //TODO: error
}

//  GET /vacancies/id
async function getById(req, res) {
  console.log("inside route");
  res.status(200).send(`
    <h2> get/vacancies/id </h2 >
    `);
}

//  POST /vacancies
async function create(req, res) {
  console.log("inside route");
  res.status(200).send(`
    <h2> post/vacancies</h2 >
    `);
}

//  PUT /vacancies
async function update(req, res) {
  console.log("inside route");
  res.status(200).send(`
    <h2> put/vacancies </h2 >
    `);
}

//  DELETE /vacancies
async function remove(req, res) {
  console.log("inside route");
  res.status(200).send(`
    <h2> delete/vacancies </h2 >
    `);
}
module.exports = { getAll, getById, create, remove, update };
