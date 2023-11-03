const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const { User, Deck, findCreateFind, Attack } = require("./index");
const { db } = require("../db/config");

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
    it("has an id", async () => {
        expect(deck).toHaveProperty("id");
        expect(deck.name).toBe("masters");
        expect(deck.xp).toBe(20);
        expect(deck instanceof Deck).toBeTruthy();
    });
});
