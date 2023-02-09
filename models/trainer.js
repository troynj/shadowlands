const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Trainer extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    roster_id: {
      type: DataTypes.Integer
    },
    location_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "location",
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

module.exports = User;
