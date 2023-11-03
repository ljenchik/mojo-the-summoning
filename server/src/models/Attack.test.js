const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const { User, Card, Deck, Attack } = require("./index");
const { db } = require("../db/config");

// define in global scope
let attack;

// clear db and create new user before tests
beforeAll(async () => {
    await db.sync({ force: true });
    attack = await Attack.create({
        title: "power",
        mojoCost: 20,
        staminaCost: 10,
    });
});

// clear db after tests
afterAll(async () => await db.sync({ force: true }));

describe("Attack", () => {
    it("has an id", async () => {
        expect(attack).toHaveProperty("id");
        expect(attack.title).toBe("power");
        expect(attack.mojoCost).toBe(20);
        expect(attack.staminaCost).toBe(10);
        expect(attack instanceof Attack).toBeTruthy();
    });
});
