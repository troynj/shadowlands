const Captured = require("./Captured");
const Location = require("./Location");
const Player = require("./Player");
const Prototype = require("./Prototype");
const Wild = require("./Wild");

Captured.belongsTo(Player, {
  foreignKey: "player_id",
});

Captured.belongsTo(Prototype, {
  foreignKey: "prototype_id",
});

Location.hasMany(Player, {
  foreignKey: "location_id",
});

Location.hasMany(Wild, {
  foreignKey: "location_id",
});

Player.belongsTo(Location, {
  foreignKey: "location_id",
});

Player.hasOne(Captured, {
  foreignKey: "player_id",
});

Prototype.hasMany(Captured, {
  foreignKey: "prototype_id",
});

Prototype.hasMany(Wild, {
  foreignKey: "prototype_id",
});

Wild.belongsTo(Location, {
  foreignKey: "location_id",
});

Wild.belongsTo(Prototype, {
  foreignKey: "prototype_id",
});

module.exports = { Captured, Location, Player, Prototype, Wild };
