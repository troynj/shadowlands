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
    user_id: {
      type: DataTypes.INTEGER,
    },
    prototype_id: {
      type: DataTypes.INTEGER,
    }
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
