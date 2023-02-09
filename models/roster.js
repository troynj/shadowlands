const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Roster extends Model {}

User.init(
  {
slot1: {
  type: DataTypes.INTEGER,
  references: {
    model: 'monster',
    key: 'id'
  }
},
slot2: {
  type: DataTypes.INTEGER,
  references: {
    model: 'monster',
    key: 'id'
  }
},
slot3: {
  type: DataTypes.INTEGER,
  references: {
    model: 'monster',
    key: 'id'
  }
},
slot4: {
  type: DataTypes.INTEGER,
  references: {
    model: 'monster',
    key: 'id'
  }
},slot5: {
  type: DataTypes.INTEGER,
  references: {
    model: 'monster',
    key: 'id'
  }
  
},slot6: {
  type: DataTypes.INTEGER,
  references: {
    model: 'monster',
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
