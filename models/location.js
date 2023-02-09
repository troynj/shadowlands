const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Monster extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    desctription: {
      type: DataTypes.STRING,
    },
    fortress_id: {
      type: DataTypes.INTEGER,
    },
    roster_id: {
      type: DataTypes.INTEGER,
    },
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
