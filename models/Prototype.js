const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Prototype extends Model {}

Prototype.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // picture: {
    //   type: DataTypes.STRING,
    // }, 
    base_attack: {
      type: DataTypes.INTEGER,
    },
    base_health: {
      type: DataTypes.INTEGER,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "prototype",
  }
);

module.exports = Prototype;
