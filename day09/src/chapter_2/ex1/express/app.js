const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const routes = {
  vacancies: require("./routes/vacancies"),
  login: require("./routes/login"),
  signup: require("./routes/signup"),
  // instruments: require("./routes/instruments"),
  // orchestras: require("./routes/orchestras"),
  // Add more routes here...
  // items: require('./routes/items'),
};

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static())

// We create a wrapper to workaround async errors not being transmitted correctly.
function makeHandlerAwareOfAsyncErrors(handler) {
  return async function(req, res, next) {
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  };
}

// We provide a root route just as an example
app.get("/", (req, res) => {
  res.send("<h1> hey <h1>");
  // res.sendFile(path.join("../frontend/dist/index.hmtl"));
});

// We define the standard REST APIs for each route (if they exist).
for (const [routeName, routeController] of Object.entries(routes)) {
  if (routeController.getAll) {
    console.log(`${routeName} ${routeController}`);
    app.get(
      `/${routeName}`,
      makeHandlerAwareOfAsyncErrors(routeController.getAll),
    );
  }
  if (routeController.getById) {
    app.get(
      `/${routeName}/:id`,
      makeHandlerAwareOfAsyncErrors(routeController.getById),
    );
  }
  if (routeController.create) {
    app.post(
      `/${routeName}`,
      makeHandlerAwareOfAsyncErrors(routeController.create),
    );
  }
  if (routeController.update) {
    app.put(
      `/${routeName}/:id`,
      makeHandlerAwareOfAsyncErrors(routeController.update),
    );
  }
  if (routeController.remove) {
    app.delete(
      `/${routeName}/:id`,
      makeHandlerAwareOfAsyncErrors(routeController.remove),
    );
  }
}

module.exports = app;
