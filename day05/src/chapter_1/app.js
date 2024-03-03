const express = require("express");
const bodyParser = require("body-parser");
const { db, sequelize } = require("./db/index.js");
const app = express();
const port = 3001;
const session = require("express-session");

function getIdParam(req) {
    const id = req.params.id;
    if (/^\d+$/.test(id)) {
        return Number.parseInt(id, 10);
    }
    return null;
}
//
// middleware to test if authenticated
function isAuthenticated(req, res, next) {
    if (req.session.user) next()
    else next('route')
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/source_code"));
app.use(express.static(__dirname + "/images"));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: false,
        secure: false,
    },
}));

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

// app.engine('handlebars');
app.set("view engine", "hbs");

// input UserId
app.get("/", async (req, res) => {
    res.render("root.hbs", {});
});
// signup
app.get("/signup", async (req, res) => {
    res.render("signup.hbs", {});
});

app.get("/signin", async (req, res) => {
    res.render("signin.hbs", {});
});

app.post("/signin", async (req, res) => {
    console.log('ON SERVER--------------------------------------');
    const { name, password } = req.body;
    let username = await db.Users.findOne({
        where: { "name": name, "password": password },
        raw: true,
    });
    if (username != undefined) {
        req.session.user = username.name;
        req.session.role = username.role;
        req.session.userId = username.id;
        req.session.save((err) => {
            if (err) return next(err);
            console.log(req.session.user);
            console.log(req.session.role);
            console.log(req.session.userId);
            res.sendStatus(200);
        });
    }
});

// List of
app.get("/orders", async (req, res) => {
    const users = await db.Users.findAll();
    let userName = users.map((item) => item.dataValues);
    console.log("===========================");
    console.log(userName);
    console.log("===========================");
    let menu = await db.MenuItem.findAll();
    let menuItem = menu.map((item) => item.dataValues);
    console.log("===========================");
    console.log(menuItem);
    console.log("===========================");
    const isWaiter = (req.session.role === 'w') ? true : false;
    const loginName = req.session.user;
    const id = req.session.userId;
    console.log('LOING NAME : ', req.session.user);
    console.log('LOGIN id:', id);
    res.render("orders.hbs", {
        userName,
        menuItem,
        isWaiter,
        loginName,
        id,
    });
});

// list of all user's orders
app.get("/orders/:id", async (req, res) => {
    let id = getIdParam(req);
    const menuItems = await db.Orders.findAll({
        where: { id: id },
        include: db.MenuItem,
        raw: true,
        nest: true,
    });
    let output = menuItems.map((el) => el.MenuItems);
    let total = output.reduce((sum, current) => sum += current.cost, 0);
    console.log("total:", total);
    res.render("orderDetail.hbs", {
        output,
        total,
        id,
    });
});

app.get("/menu", async (req, res) => {
    const items = await db.MenuItem.findAll({});
    console.log(items);
    res.render("menu.hbs", {
        items,
    });
});

//id - user_id;
app.get("/:id", async (req, res) => {
    const userId = getIdParam(req);
    const orders = await db.UsersOrders.findAll(
        { where: { UserId: userId } },
    );
    res.status(200).json(orders);
});

app.post("/orders", async (req, res) => {
    let newOrder = await db.Orders.create(
        {
            isActive: true,
        },
    );
    console.log("================== ORDER ID", newOrder.getDataValue("id"));
    for (item of req.body.MenuItems) {
        await db.OrdersMenu.create({
            "MenuItemId": item,
            "OrderId": newOrder.getDataValue("id"),
        });
    }
    await db.UsersOrders.create(
        {
            UserId: req.body.UserId,
            OrderId: newOrder.getDataValue("id"),
        },
    );
    // заказ должен создавать UsersOrders строку для выбранного официанта?
    res.status(201).send(newOrder);
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
    console.log("id", id);
    console.log("body id", req.body.id);
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

app.get("/users", async (req, res) => {
    let users = await db.Users.findAll();
    res.status(200).json(users);
});

app.post("/waiters", async (req, res) => {
    if (!req.body.id) {
        res.status(400).send(
            `Bad request: ID should not be null, since it is determined automatically by the database.`,
        );
    } else {
        await db.Users.create(req.body);
        res.status(200).end({ message: "OK" });
    }
});

app.post("/signup", async (req, res) => {
    const user = await db.Users.create(req.body);
    const id = user.getDataValue('id');
    req.session.regenerate(function(err) {
        if (err) next(err)
        req.session.user = req.body.name;
        req.session.role = req.body.role;
        req.session.userId = id;
        req.session.save((err) => {
            if (err) return next(err);
            res.end();
        });
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
