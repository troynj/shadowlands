const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class User extends Model {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    roster_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    main_monster_id: {
      type:DataType.INTEGER,
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
