const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Arena extends Model {}

Arena.init(
  {
    
    captured_id: {
      type: DataTypes.INTEGER,
    },
    captured_attack: {
      type: DataTypes.INTEGER,
    },
    // captured_special: {
    //   type: DataTypes.INTEGER,
    // },
    // captured_defense: {
    //   type: DataTypes.INTEGER,
    // },
    captured_health: {
      type: DataTypes.INTEGER,
    },
    opponent_type: {
      type: DataTypes.STRING,
    },
    opponent_attack: {
      type: DataTypes.INTEGER,
    },
    // opponent_special: {
    //   type: DataTypes.INTEGER,
    // },
    // oponent_defense: {
    //   type: DataTypes.INTEGER,
    // },
    opponent_health: {
      type: DataTypes.INTEGER,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "arena",
  }
);

module.exports = Arena;
