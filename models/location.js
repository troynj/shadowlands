const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Monster extends Model {}

User.init(
  {
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    desctription: {
      type: DataTypes.STRING,
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "location",
  }
);

module.exports = Location;
