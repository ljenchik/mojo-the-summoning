const {
    describe,
    test,
    expect,
    beforeAll,
    afterAll,
} = require("@jest/globals");
const { User, Deck, Card, Attack } = require("./index");
const { db } = require("../db/config");
//require("./../db/seed");
const { seed } = require("../db/seed");

// define in global scope
let user;

// clear db and create new user before tests
beforeAll(async () => {
    await db.sync({ force: true });
    await seed();
});

describe("User", () => {
    test("creates user with id and correct username", async () => {
        const user = await User.create({ username: "gandalf" });
        expect(user).toHaveProperty("id");
        expect(user.username).toBe("gandalf");
        expect(typeof user.username).toBe("string");
        expect(user instanceof User).toBeTruthy();
    });

    test("reads correct user", async () => {
        const foundUser = await User.findOne({
            where: { username: "trinity" },
        });
        expect(foundUser).toHaveProperty("id");
        expect(foundUser.username).toBe("trinity");
        expect(typeof foundUser.username).toBe("string");
        expect(foundUser instanceof User).toBeTruthy();
    });

    test("updates correct user", async () => {
        const foundUser = await User.findOne({
            where: { username: "trinity" },
        });
        foundUser.update({ username: "goliaph" });
        expect(foundUser.username).toBe("goliaph");
        expect(typeof foundUser.username).toBe("string");
        expect(foundUser instanceof User).toBeTruthy();
        const allUsers = await User.findAll();
        expect(allUsers).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ username: "goliaph" }),
            ])
        );
    });

    test("deleted correct user", async () => {
        const allUsers = await User.findAll();
        const length = allUsers.length;
        expect(length).toBe(4);
        const destroyedUser = await User.findByPk(3);
        expect(destroyedUser.username).toEqual("mr_spoon");
        await destroyedUser.destroy();
        const newAllUsers = await User.findAll();
        expect(newAllUsers.length).toBe(3);
    });

    test("user owns a deck", async () => {
        const user = await User.findByPk(1);
        const deck = await Deck.findOne({ where: { name: "the matrix" } });
        await user.setDeck(deck);
        const userWithDeck = await User.findByPk(user.id, { include: Deck });
        expect(userWithDeck).toEqual(
            expect.objectContaining({
                Deck: expect.objectContaining({
                    name: "the matrix",
                }),
            })
        );
    });
});
