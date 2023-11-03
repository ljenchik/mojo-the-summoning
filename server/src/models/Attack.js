// create your Attack model here
const { db } = require("./../db/config.js");
const { DataTypes, Model } = require("sequelize");

class Attack extends Model {}

// Defines a table User inside db
Attack.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true },
        title: DataTypes.STRING,
        mojoCost: DataTypes.INTEGER,
        staminaCost: DataTypes.INTEGER,
    },
    {
        sequelize: db,
        modelName: "Attack",
    }
);

module.exports = Attack;
