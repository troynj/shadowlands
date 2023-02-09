const sequelize = require("../config/connection");
const { local_leader, local_monster, local_trainer, location, monster, trainer, user } = require("../models");

const local_leaderSeeds = require("./local_leader.json");
const local_monsterSeeds = require("./local_monster.json");
const local_trainerSeeds = require("./uslocal_trainerer.json");
const locationSeeds = require("./location.json");
const monsterSeeds = require("./monster.json");
const trainerSeeds = require("./trainer.json");
const userSeeds = require("./user.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  local_leader.bulkCreate(local_leader)
  local_monster.bulkCreate(local_monster)
  local_trainer.bulkCreate(local_trainer)
  location.bulkCreate(location)
  monster.bulkCreate(monster)
  trainer.bulkCreate(trainer)
  user.bulkCreate(user)


  process.exit(0);
};

seedDatabase();
