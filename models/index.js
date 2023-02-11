const Captured = require("./Captured");
const Location = require("./Location");
const Player = require("./Player");
const Prototype = require("./Prototype");
const Wild = require("./Wild");

Captured.belongsTo(Player, {
  foreignKey: "player_id",
  onDelete: "CASCADE",
});

Captured.belongsTo(Prototype, {
  foreignKey: "prototype_id",
  onDelete: "CASCADE",
});

Location.hasMany(Player, {
  foreignKey: "location_id",
});

Location.hasMany(Wild, {
  foreignKey: "location_id",
});

Player.belongsTo(Location, {
  foreignKey: "location_id",
  onDelete: "CASCADE",
});

Player.hasOne(Captured, {
  foreignKey: "player_id",
  onDelete: "CASCADE",
});

Prototype.hasMany(Captured, {
  foreignKey: "prototype_id",
  onDelete: "CASCADE",
});

Prototype.hasMany(Wild, {
  foreignKey: "prototype_id",
  onDelete: "CASCADE",
});

Wild.belongsTo(Location, {
  foreignKey: "location_id",
  onDelete: "CASCADE",
});

Wild.belongsTo(Prototype, {
  foreignKey: "prototype_id",
  onDelete: "CASCADE",
});

module.exports = { Captured, Location, Player, Prototype, Wild };
