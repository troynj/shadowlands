const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Captured extends Model {}

Captured.init(
  {
    attack: {
      type: DataTypes.INTEGER,
    },
    health: {
      type: DataTypes.INTEGER,
    },
    player_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "player",
        key: "id",
      },
    },
    prototype_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "prototype",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "captured",
  }
);

module.exports = Captured;
