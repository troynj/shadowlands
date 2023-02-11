const Captured = require("./Captured");
const Journey = require("./Jorney");
const Player = require("./Player");
const Prototype = require("./Prototype");
const ShadowBeast = require("./ShadowBeast");
const User = require("./User");
const Wild = require("./Wild");

Captured.belongsTo(Player, {
  foreignKey: "player_id",
  onDelete: "CASCADE"
});

Captured.belongsTo(Prototype, {
  foreignKey: "prototype_id",
  onDelete: "CASCADE"
});

Journey.hasMany(Player, {
  foreignKey: "journey_id",
});

Journey.hasMany(Wild, {
  foreignKey: "journey_id",
});

Journey.hasMany(ShadowBeast, {
  foreignKey: "journey_id",
});

// Journey.belongsTo(Wild, {
//   foreignKey: 'opponent_id'
// })

// Journey.belongsTo(ShadowBeast, {
//   foreignKey: 'beast_id'
// })

Player.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
});

Player.belongsTo(Journey, {
  foreignKey: "journey_id",
  onDelete: "CASCADE"
});

Player.hasOne(Captured, {
  foreignKey: "player_id",
  onDelete: "CASCADE"
});

Prototype.hasMany(Captured, {
  foreignKey: "prototype_id",
  onDelete: "CASCADE"
});

Prototype.hasMany(ShadowBeast, {
  foreignKey: "prototype_id",
  onDelete: "CASCADE"
});

Prototype.hasMany(Wild, {
  foreignKey: "prototype_id",
  onDelete: "CASCADE"
});

ShadowBeast.belongsTo(Prototype, {
  foreignKey: 'prototype_id'
})

ShadowBeast.belongsTo(Journey, {
  foreignKey: 'prototype_id'
})

// ShadowBeast.hasOne(Journey, {
//   foreignKey: 'beast_id'
// })

User.hasMany(Player, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
});

Wild.belongsTo(Journey, {
  foreignKey: "journey_id",
  onDelete: "CASCADE"
});

Wild.belongsTo(Prototype, {
  foreignKey: "prototype_id",
  onDelete: "CASCADE"
});

// Wild.hasOne(Journey, {
//   foreignKey: 'opponent_id'
// })

module.exports = { Captured, Journey, Player, Prototype, ShadowBeast, User, Wild };
