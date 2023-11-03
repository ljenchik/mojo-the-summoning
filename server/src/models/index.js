const User = require("./User");
const Deck = require("./Deck");
const Card = require("./Card");
const Attack = require("./Attack");

//set up the associations here
// 1:1 for User-Deck association
User.hasOne(Deck);
Deck.belongsTo(User);

// 1:many for Deck-Card association
Deck.hasMany(Card);
Card.belongsTo(Deck);

//many:many
Card.belongsToMany(Attack, { through: "card-attack" });
Attack.belongsToMany(Card, { through: "card-attack" });

module.exports = { User, Deck, Card, Attack };
