// create your Card model here
const { db } = require("./../db/config.js");
const { DataTypes, Model } = require("sequelize");

class Card extends Model {}

// Defines a table User inside db
Card.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true },
        name: DataTypes.STRING,
        mojo: DataTypes.INTEGER,
        stamina: DataTypes.INTEGER,
        imgUrl: DataTypes.STRING,
    },
    {
        sequelize: db,
        modelName: "Card",
    }
);

module.exports = Card;
