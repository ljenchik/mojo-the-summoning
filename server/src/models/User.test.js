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
let user;

// clear db and create new user before tests
beforeAll(async () => {
    await db.sync({ force: true });
    user = await User.create({ username: "gandalf" });
});

// clear db after tests
afterAll(async () => await db.sync({ force: true }));

describe("User", () => {
    test("has id and correct username", async () => {
        expect(user).toHaveProperty("id");
        expect(user.username).toBe("gandalf");
        expect(user instanceof User).toBeTruthy();
    });

    test("user owns a deck", async () => {
        const deck = await Deck.create({ name: "the matrix", xp: 5 });
        await user.setDeck(deck);
        const userWithDeck = await User.findOne({
            where: { username: "gandalf" },
            include: Deck,
        });
        expect(userWithDeck).toEqual(
            expect.objectContaining({
                Deck: expect.objectContaining({
                    name: "the matrix",
                }),
            })
        );
    });
});
