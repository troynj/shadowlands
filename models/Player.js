const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Player extends Model {}

Player.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    progress: {
      type: DataTypes.INTEGER,
    },
    journey_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "journey",
        key: "id",
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "player",
  }
);

module.exports = Player;
