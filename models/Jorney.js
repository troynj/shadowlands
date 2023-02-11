const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Journey extends Model {}

Journey.init(
  {
    name: {
      type: DataTypes.STRING
    },
    intro: {
      type: DataTypes.TEXT,
    },
    conc: {
      type: DataTypes.TEXT,
    },
    // opponent_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'wild',
    //     key: 'id'
    //   }
    // },
    // beast_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'shadowbeast',
    //     key: 'id'
    //   }
    // }
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
