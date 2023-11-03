const { describe, test, expect, beforeAll } = require("@jest/globals");
const { User, Deck, Card, Attack } = require("./index");
const { db } = require("../db/config");
//require("./../db/seed");
const { seed } = require("../db/seed");

// clear db and create new user before tests
beforeAll(async () => {
    await db.sync({ force: true });
    await seed();
});

describe("Deck", () => {
    test("creates deck with id, name, xp properties", async () => {
        const deck = await Deck.create({ name: "masters", xp: 20 });
        expect(deck).toHaveProperty("id");
        expect(deck.name).toBe("masters");
        expect(typeof deck.name).toBe("string");
        expect(deck.xp).toBe(20);
        expect(typeof deck.xp).toBe("number");
        expect(deck instanceof Deck).toBeTruthy();
    });

    test("reads correct deck", async () => {
        const foundDeck = await Deck.findByPk(2);
        expect(foundDeck).toHaveProperty("id");
        expect(typeof foundDeck.name).toBe("string");
        expect(foundDeck.name).toBe("the matrix");
        expect(foundDeck instanceof Deck).toBeTruthy();
    });

    test("updates correct deck", async () => {
        const foundDeck = await Deck.findByPk(2);
        await foundDeck.update({ name: "cowboy" });
        expect(foundDeck.name).toBe("cowboy");
        expect(typeof foundDeck.name).toBe("string");
        expect(foundDeck instanceof Deck).toBeTruthy();
        const allDecks = await Deck.findAll();
        expect(allDecks).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ name: "cowboy" }),
            ])
        );
    });

    test("deletes correct deck", async () => {
        const allDecks = await Deck.findAll();
        const length = allDecks.length;
        expect(length).toBe(4);
        const destroyedDeck = await Deck.findByPk(3);
        expect(destroyedDeck.name).toEqual("Doom Burger");
        await destroyedDeck.destroy();
        const newAllDecks = await Deck.findAll();
        expect(newAllDecks.length).toBe(3);
    });

    test("deck belongs to one user", async () => {
        const user = await User.findOne({
            where: { username: "mr_spoon" },
        });
        const deck = await Deck.findOne({ where: { name: "snake pit" } });
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
        const deck = await Deck.findByPk(1);
        const card1 = await Card.findByPk(1);
        const card2 = await Card.findByPk(2);
        await deck.addCard([card1, card2]);
        const deckWithCards = await Deck.findByPk(deck.id, { include: Card });
        //console.log(JSON.stringify(deckWithCards, null, 2));
        let test = await deckWithCards.getCards();
        expect(test[0] instanceof Card).toBe(true);
        expect(test[1] instanceof Card).toBe(true);
    });
});
