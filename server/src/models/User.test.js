const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const { User, Deck, findCreateFind, Attack } = require("./index");
const { db } = require("../db/config");

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
    it("has an id", async () => {
        expect(user).toHaveProperty("id");
        expect(user.username).toBe("gandalf");
        expect(user instanceof User).toBeTruthy();
    });
});
