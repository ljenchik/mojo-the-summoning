const {
    describe,
    test,
    expect,
    beforeAll,
    afterAll,
} = require("@jest/globals");
const { User, Card, Deck, Attack } = require("./index");
const { db } = require("../db/config");
//require("./../db/seed");
const { seed } = require("../db/seed");

// define in global scope
let card;

// clear db and create new user before tests
beforeAll(async () => {
    await db.sync({ force: true });
    await seed();
});

// clear db after tests
//afterAll(async () => await db.sync({ force: true }));

describe("Card", () => {
    test("card has id, name, mojo, stamina, imgUrl", async () => {
        const card = await Card.findByPk(1);
        expect(card).toHaveProperty("id");
        expect(typeof card.name).toBe("string");
        expect(typeof card.mojo).toBe("number");
        expect(typeof card.stamina).toBe("number");
        expect(typeof card.imgUrl).toBe("string");
        expect(card instanceof Card).toBeTruthy();
    });

    test("card have many attacks", async () => {
        const card = await Card.findByPk(1);
        const attack1 = await Attack.create({
            title: "hit",
            mojoCost: 10,
            staminaCost: 20,
        });
        const attack2 = await Attack.create({
            title: "jump",
            mojoCost: 5,
            staminaCost: 10,
        });

        await card.addAttacks([attack1, attack2]);
        const card_attacks = await card.getAttacks();
        expect(card_attacks.length).toBe(2);
        expect(card_attacks[0] instanceof Attack).toBe(true);
    });
});
