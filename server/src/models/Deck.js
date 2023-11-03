// create your Deck model here
const { db } = require("./../db/config.js");
const { DataTypes, Model } = require("sequelize");

class Deck extends Model {}

// Defines a table User inside db
Deck.init(
    {
        //id: { type: DataTypes.INTEGER, primaryKey: true },
        name: DataTypes.STRING,
        xp: DataTypes.INTEGER,
    },
    {
        sequelize: db,
        modelName: "Deck",
    }
);

module.exports = Deck;
