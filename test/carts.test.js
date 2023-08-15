import Assert from "assert";
import mongoose from "mongoose";
import { DaoMongoose } from "../src/dao/DaoMongoose.js";
import supertest from "supertest";
import { PORT } from "../src/config/env.config.js";

const assert = Assert.strict;

//TESTs

const httpClient = supertest(`http://localhost:${PORT}/`);

describe("Testing Dao Users", () => {
    before(async () => {
        await mongoose.connection.collection("users").deleteMany({});
    });
    describe("API Carts", () => {
        describe("Cuando creo un nuevo usuario con datos correctos", () => {
            it("Retorna el usuario con los mismos datos", async () => {
                const dao = new DaoMongoose(usersTestModel);
                const pojo = await dao.create(userTestData);
                assert.ok(pojo.first_name, "debería tener first_name");
            });
        });
    });
});
