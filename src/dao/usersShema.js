import mongoose from "mongoose";
import { DaoMongoose } from "./DaoMongoose.js";

const schemaUsers = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    age: { type: Number },
    cart: { type: String },
    role: { type: String, default: 'user' },
    user: { type: String, required: true },
    pass: { type: String },
}, { versionKey: false })

const modelUsers = mongoose.model('users', schemaUsers)

export const usersDaoMoongose = new DaoMongoose(modelUsers)

class UsersManager {
    #usersDb
    constructor() {
        this.#usersDb = mongoose.model('users', schemaUsers)
    }

    async register(data) {
        let newUser = await this.#usersDb.create(data)
        return newUser
    }
    async getAll() {
        const allUsers = await this.#usersDb.find().lean()
        return allUsers
    }
    async getByID(id) {
        const user = await this.#usersDb.findById(id).lean()
        return user
    }
    async getByUser(user) {
        const userData = await this.#usersDb.findOne({ user: user }).lean()
        return userData
    }
}

export const usersManager = new UsersManager()