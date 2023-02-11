const sequelize = require("../config/connection");
const { Captured, Journey, Player, Prototype, ShadowBeast, User, Wild } = require("../models");

const captured = require("./captured.json");
const journey = require("./journey.json");
const player = require("./player.json");
const prototype = require("./prototype.json");
const shadowbeast = require("./shadowbeast.json");
const wild = require("./wild.json");
const user = require("./user.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(user);
  await Journey.bulkCreate(journey);
  await Player.bulkCreate(player);
  await Prototype.bulkCreate(prototype);
  await Wild.bulkCreate(wild);
  await ShadowBeast.bulkCreate(shadowbeast);
  await Captured.bulkCreate(captured);
  
  process.exit(0);
};

seedDatabase();
