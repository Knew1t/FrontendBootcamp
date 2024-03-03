const express = require("express");
const bodyParser = require("body-parser");
const { db, sequelize } = require("./ex01/index.js");
const app = express();
const port = 3000;

//helper
function getIdParam(req) {
  const id = req.params.id;
  if (/^\d+$/.test(id)) {
    return Number.parseInt(id, 10);
  }
  return null;
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get("/orders", async (req, res) => {
  const orders = await db.Orders.findAll();
  res.status(200).json(orders);
});

app.get("/menu", async (req, res) => {
  const orders = await db.MenuItem.findAll();
  res.status(200).json(orders);
});

app.post("/orders", async (req, res) => {
  if (!req.body.id) {
    res.status(400).send(
      `Bad request: ID should not be null, since it is determined automatically by the database.`,
    );
  } else {
    await db.Orders.create(req.body);
    res.status(201).end();
  }
});

app.put("/orders/:id", async (req, res) => {
  const id = getIdParam(req);
  if (req.body.id === id) {
    await db.Orders.update(req.body, {
      where: {
        id: id,
      },
    });
    res.status(200).end();
  } else {
    res.status(400).send(
      `Bad request: param ID (${id}) does not match body ID (${req.body.id}).`,
    );
  }
});

app.delete("/orders/:id", async (req, res) => {
  const id = getIdParam(req);
  console.log(id);
  if (req.body.id === id) {
    await db.Orders.update(
      { "isActive": false },
      {
        where: {
          id: id,
        },
      },
    );
    res.status(200).end();
  } else {
    res.status(400).send(
      `Bad request: param ID (${id}) does not match body ID (${req.body.id}).`,
    );
  }
});

app.post("/waiters", async (req, res) => {
  if (!req.body.id) {
    res.status(400).send(
      `Bad request: ID should not be null, since it is determined automatically by the database.`,
    );
  } else {
    await db.Users.create(req.body);
    res.status(201).end();
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
