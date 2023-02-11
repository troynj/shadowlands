const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Wild extends Model {}

Wild.init(
  {
    attack: {
      type: DataTypes.INTEGER,
    },
    health: {
      type: DataTypes.INTEGER,
    },
    location_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'location',
        key: 'id'
      }
    },
    prototype_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'prototype',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "wild",
  }
);

module.exports = Wild;
