const {
    describe,
    test,
    expect,
    beforeAll,
    afterAll,
} = require("@jest/globals");
const { User, Deck, Card, Attack } = require("./index");
const { db } = require("../db/config");
require("./../db/seed");
// define in global scope
let deck;

// clear db and create new user before tests
beforeAll(async () => {
    await db.sync({ force: true });
    deck = await Deck.create({ name: "masters", xp: 20 });
});

// clear db after tests
afterAll(async () => await db.sync({ force: true }));

describe("Deck", () => {
    test("has id, name, xp properties", async () => {
        expect(deck).toHaveProperty("id");
        expect(deck.name).toBe("masters");
        expect(deck.xp).toBe(20);
        expect(deck instanceof Deck).toBeTruthy();
    });

    test("deck belongs to one user", async () => {
        const user = await User.findOne({
            where: { username: "mr_spoon" },
        });
        const deck = await Deck.findOne({ where: { name: "the matrix" } });
        await deck.setUser(user);
        const deckWithUser = await Deck.findByPk(deck.id, { include: User });
        //console.log(JSON.stringify(deckWithUser, null, 2));
        expect(deckWithUser).toEqual(
            expect.objectContaining({
                User: expect.objectContaining({
                    username: "mr_spoon",
                }),
            })
        );
    });

    test("deck has many cards", async () => {
        const deck = await Deck.findOne({ where: { name: "the matrix" } });
        const card1 = await Card.findByPk(1);
        const card2 = await Card.findByPk(2);
        await deck.addCard([card1, card2]);
        const deckWithCards = await Deck.findByPk(deck.id, { include: Card });
        console.log(JSON.stringify(deckWithCards, null, 2));
        let test = await deckWithCards.getCards();
        expect(test[0] instanceof Card).toBe(true);
        expect(test[1] instanceof Card).toBe(true);
    });
});
