import Assert from "assert";
import mongoose from "mongoose";
import { DaoMongoose } from "../src/dao/DaoMongoose.js";
import { encryptPass } from "../src/utils/bcrypt.js";

const assert = Assert.strict;

// Tests Shema -------------------------------------------------------------------------------------------

const validRoles = ["user", "premium", "admin"];

const schemaUsers = new mongoose.Schema(
    {
        first_name: { type: String },
        last_name: { type: String },
        age: { type: Number },
        cart: { type: String, default: "" },
        role: {
            type: String,
            default: "user",
            validate: {
                validator: function (value) {
                    // Verificar si el valor de 'role' está en la lista de valores válidos
                    return validRoles.includes(value);
                },
                message: (props) => `${props.value} no es un valor válido para el campo 'role'`,
            },
        },
        user: { type: String, required: true },
        pass: { type: String },
    },
    { versionKey: false }
);

const usersTestModel = mongoose.model("users", schemaUsers);

// datos de prueba ----------------------------------------------------------------------------------------------

const userTestData = {
    first_name: "Prueba",
    last_name: "Usuario",
    age: 23,
    cart: "asdfasdf21312312",
    role: "user",
    user: "pruebamocha@mocha.cl",
    pass: encryptPass("passTest"),
};

const testDataIncomplete = {
    first_name: "Prueba",
    last_name: "Usuario",
    age: 23,
    cart: "asdfasdf21312312",
    role: "user",
    pass: encryptPass("passTest"),
};

const ejemploUsuario = {
    first_name: "Prueba",
    last_name: "Usuario",
    age: 23,
    cart: "asdfasdf21312312",
    role: "rolInvalido",
    user: "pruebamocha@mocha.cl",
    pass: encryptPass("passTest"),
};

//TESTs

describe("Testing Dao Users", () => {
    before(async () => {
        await mongoose.connection.collection("users").deleteMany({});
    });
    describe("create", () => {
        describe("Cuando creo un nuevo usuario con datos correctos", () => {
            it("Retorna el usuario con los mismos datos", async () => {
                const dao = new DaoMongoose(usersTestModel);
                const pojo = await dao.create(userTestData);
                assert.ok(pojo.first_name, "debería tener first_name");
                assert.ok(pojo.last_name, "debería tener last_name");
                assert.ok(pojo.age, "debería tener age");
                assert.ok(pojo.role, "debería tener role");
                assert.ok(pojo.user, "debería tener user");
                assert.ok(pojo.pass, "debería tener pass");
            });
        });

        describe("Cuando intento crear un usuario con información incompleta", () => {
            it("Lanza un error", async () => {
                const dao = new DaoMongoose(usersTestModel);
                await assert.rejects(dao.create(testDataIncomplete));
            });
        });

        it('Si el usuario no existe lanza un error', async () => {
            const dao = new DaoMongoose(usersTestModel);
            await assert.rejects(dao.readOne({ id: '111111111111111' }))
        })
    });
});
