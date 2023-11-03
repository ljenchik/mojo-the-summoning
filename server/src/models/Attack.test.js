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

// clear db and create new user before tests
beforeAll(async () => {
    await db.sync({ force: true });
    await seed();
});

// clear db after tests
//afterAll(async () => await db.sync({ force: true }));

describe("Attack", () => {
    test("creates attack", async () => {
        const attack = await Attack.create({
            title: "power",
            mojoCost: 20,
            staminaCost: 10,
        });
        expect(attack).toHaveProperty("id");
        expect(attack.title).toBe("power");
        expect(typeof attack.title).toBe("string");
        expect(attack.mojoCost).toBe(20);
        expect(typeof attack.mojoCost).toBe("number");
        expect(attack.staminaCost).toBe(10);
        expect(typeof attack.staminaCost).toBe("number");
        expect(attack instanceof Attack).toBeTruthy();
    });

    test("reads attack", async () => {
        const foundAttack = await Attack.findByPk(2);
        expect(foundAttack).toHaveProperty("id");
        expect(typeof foundAttack.title).toBe("string");
        expect(foundAttack.title).toBe("hurt");
        expect(foundAttack instanceof Attack).toBeTruthy();
    });

    test("updates correct attack", async () => {
        const foundAttack = await Attack.findByPk(2);
        await foundAttack.update({ title: "jump" });
        expect(foundAttack.title).toBe("jump");
        expect(typeof foundAttack.title).toBe("string");
        expect(foundAttack instanceof Attack).toBeTruthy();
        const allAttacks = await Attack.findAll();
        expect(allAttacks).toEqual(
            expect.arrayContaining([expect.objectContaining({ title: "jump" })])
        );
    });

    test("deletes correct attack", async () => {
        const allAttacks = await Attack.findAll();
        const length = allAttacks.length;
        const destroyedAttack = await Attack.findByPk(3);
        await destroyedAttack.destroy();
        const newAllAttacks = await Attack.findAll();
        expect(newAllAttacks.length).toBe(length - 1);
    });

    test("attack belongs to many cards", async () => {
        const attack = await Attack.findByPk(1);
        const card1 = await Card.findByPk(1);
        const card2 = await Card.findByPk(2);

        await attack.addCards([card1, card2]);
        const attack_cards = await attack.getCards();
        expect(attack_cards.length).toBe(2);
        expect(attack_cards[0] instanceof Card).toBe(true);
    });
});
