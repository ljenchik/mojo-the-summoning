// create your User model here
const { db } = require("./../db/config.js");
const { DataTypes, Model } = require("sequelize");

class User extends Model {}

// Defines a table User inside db
User.init(
    {
        //id: { type: DataTypes.INTEGER, primaryKey: true },
        username: DataTypes.STRING,
    },
    {
        sequelize: db,
        modelName: "User",
    }
);

module.exports = User;
