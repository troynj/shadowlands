const sequelize = require("../config/connection");
const { Captured, Location, Player, Prototype, Wild } = require("../models");

const captured = require("./captured.json");
const location = require("./location.json");
const player = require("./player.json");
const prototype = require("./prototype.json");
const wild = require("./wild.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Location.bulkCreate(location);
  await Prototype.bulkCreate(prototype);
  await Wild.bulkCreate(wild);
  await Captured.bulkCreate(captured);
  await Player.bulkCreate(player);

  process.exit(0);
};

seedDatabase();
