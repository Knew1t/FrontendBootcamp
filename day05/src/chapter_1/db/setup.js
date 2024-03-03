const db = require("./models/index.js");
const sequelize = db.sequelize;

async function setupMenu() {
    console.log("FILLING MENU TABLE!");
    await db.sequelize.sync();
    let len = await db.MenuItem.findAll();
    if (len == 0) {
        await db.MenuItem.create({
            title: "unagi",
            picture: "../unagi.jpeg",
            cost: 300,
            callQuantity: 123,
            description: "it is a unagi roll",
        });

        await db.MenuItem.create({
            title: "california",
            picture: "../california-roll.jpeg",
            cost: 400,
            callQuantity: 123,
            description: "it is a california roll",
        });

        await db.MenuItem.create({
            title: "coca-cola",
            picture: "../coca-cola.webp",
            cost: 400,
            callQuantity: 123,
            description: "it is a coca-cola picture",
        });
        await db.MenuItem.create({
            title: "sprite",
            picture: "../sprite.jpeg",
            cost: 400,
            callQuantity: 123,
            description: "it is a sprite",
        });
        await db.MenuItem.create({
            title: "chicken wings",
            picture: "../chicken-wings.jpeg ",
            cost: 400,
            callQuantity: 1,
            description: "it is a chicken wings",
        });
        await db.MenuItem.create({
            title: "mushrooms",
            picture: "../mushrooms.jpeg",
            cost: 400,
            callQuantity: 13,
            description: "it is a mushrooms",
        });
        await db.MenuItem.create({
            title: "fri potatoe",
            picture: "../fri.jpeg",
            cost: 400,
            callQuantity: 13,
            description: "it is a fri potatoes",
        });
    }
}

async function setupUsers() {
    await db.sequelize.sync();
    let len = await db.Users.findAll();
    if (len == 0) {
        await db.Users.create({
            name: "Swindell",
            role: "w",
            password: "1",
        });
        await db.Users.create({
            name: "Hubertfu",
            role: "w",
            password: "12",
        });
        await db.Users.create({
            name: "Tarticar",
            role: "w",
            password: "123",
        });
        await db.Users.create({
            name: "Lacresha",
            role: "w",
            password: "1234",
        });
    }
}

async function setupOrders() {
    await db.sequelize.sync();
    let len = await db.Orders.findAll();
    if (len == 0) {
        await db.Orders.create({
            isActive: true,
        });
        await db.OrdersMenu.create({
            MenuItemId: 1,
            OrderId: 1,
        });
        await db.OrdersMenu.create({
            MenuItemId: 2,
            OrderId: 1,
        });
        await db.OrdersMenu.create({
            MenuItemId: 3,
            OrderId: 1,
        });
        await db.UsersOrders.create({
            UserId: 1,
            OrderId: 1,
        });
        await db.Orders.create({
            isActive: true,
        });
        await db.OrdersMenu.create({
            MenuItemId: 1,
            OrderId: 2,
        });
        await db.OrdersMenu.create({
            MenuItemId: 2,
            OrderId: 2,
        });
        await db.OrdersMenu.create({
            MenuItemId: 3,
            OrderId: 2,
        });
        await db.UsersOrders.create({
            UserId: 2,
            OrderId: 2,
        });
        await db.Orders.create({
            isActive: true,
        });
        await db.OrdersMenu.create({
            MenuItemId: 4,
            OrderId: 3,
        });
        await db.OrdersMenu.create({
            MenuItemId: 5,
            OrderId: 3,
        });
        await db.OrdersMenu.create({
            MenuItemId: 6,
            OrderId: 3,
        });
        await db.UsersOrders.create({
            UserId: 1,
            OrderId: 3,
        });
    }
}

let promise = setupUsers();
promise.then(setupMenu).then(setupOrders);
