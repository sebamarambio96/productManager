import mongoose from "mongoose";
import { MONGO_BBDD_TEST, MONGO_PASS, MONGO_SERVER, MONGO_USER } from "../src/config/env.config.js";

export async function connectMongo() {
    await mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_SERVER}/${MONGO_BBDD_TEST}?retryWrites=true&w=majority`);
    console.log(`Base de datos conectada.`);
}

export const mochaHooks = {
    async beforeAll() {
        await connectMongo()
    },

    async afterAll() {
        await mongoose.connection.close();
    },
};
