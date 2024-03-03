const sequelize = require("./index.js");

async function reset() {
  console.log(
    "Will rewrite the SQLite example database, adding some dummy data.",
  );

  await sequelize.sync({ force: true });

  await sequelize.models.users.bulkCreate([
    { username: "jack", type: "employee", password: "123" },
    { username: "white", type: "employee", password: "123" },
    { username: "black", type: "employee", password: "123" },
    { username: "brown", type: "employee", password: "123" },
  ]);

  await sequelize.models.vacancy.bulkCreate([
    {
      title: "gopher",
      description: "work for food in a nice language",
      english_level: "c1",
      grade: "senior",
      contacts: "aboba@mail",
      tags: ["one", "two"],
      isActive: true,
    },
    {
      title: "javascripper",
      description: "rot your brain with a joke language",
      english_level: "c1",
      grade: "senior",
      contacts: "aboba@mail",
      tags: ["one", "two"],
      isActive: true,
    },
    {
      title: "java",
      description: "write instant legacy code",
      english_level: "c1",
      grade: "senior",
      contacts: "aboba@mail",
      tags: ["one", "two"],
      isActive: true,
    },
  ]);

  // Let's create random instruments for each orchestra
  // for (const orchestra of await sequelize.models.orchestra.findAll()) {
  //   for (let i = 0; i < 10; i++) {
  //     const type = pickRandom([
  //       "violin",
  //       "trombone",
  //       "flute",
  //       "harp",
  //       "trumpet",
  //       "piano",
  //       "guitar",
  //       "pipe organ",
  //     ]);
  //
  //     await orchestra.createInstrument({
  //       type: type,
  //       purchaseDate: randomDate(),
  //     });

  // The following would be equivalent in this case:
  // await sequelize.models.instrument.create({
  // 	type: type,
  // 	purchaseDate: randomDate(),
  // 	orchestraId: orchestra.id
  // });
  //   }
  // }

  console.log("Done!");
}

reset();
