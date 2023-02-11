const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Journey extends Model {}

Journey.init(
  {
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "journey",
  }
);

module.exports = Journey;
