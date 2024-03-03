async function create(req, res) {
  console.log("inside post/login route");
  res.status(200).send(`
    <h2> post/login</h2 >
    `);
}

module.exports = { create };
