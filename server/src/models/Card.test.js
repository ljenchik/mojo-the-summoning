const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const { User, Card, Deck, Attack } = require("./index");
const { db } = require("../db/config");

// define in global scope
let card;

// clear db and create new user before tests
beforeAll(async () => {
    await db.sync({ force: true });
    card = await Card.create({
        name: "mighty",
        mojo: 20,
        stamina: 100,
        imgUrl: "image",
    });
});

// clear db after tests
afterAll(async () => await db.sync({ force: true }));

describe("Card", () => {
    it("has an id", async () => {
        expect(card).toHaveProperty("id");
        expect(card.name).toBe("mighty");
        expect(card.mojo).toBe(20);
        expect(card.stamina).toBe(100);
        expect(card.imgUrl).toBe("image");
        expect(card instanceof Card).toBeTruthy();
    });
});
