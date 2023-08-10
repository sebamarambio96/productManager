import mongoose from "mongoose";
import { DaoMongoose } from "./DaoMongoose.js";

const validRoles = ['user', 'premium', 'admin'];

const schemaUsers = new mongoose.Schema({
    first_name: { type: String },
    last_name: { type: String },
    age: { type: Number },
    cart: { type: String, default: '' },
    role: {
        type: String,
        default: 'user',
        validate: {
            validator: function (value) {
                // Verificar si el valor de 'role' está en la lista de valores válidos
                return validRoles.includes(value);
            },
            message: props => `${props.value} no es un valor válido para el campo 'role'`
        }
    },
    user: { type: String, required: true },
    pass: { type: String },
    documents: [{
        name: String,
        reference: String
    }],
    last_connection: { type: Date }
}, { versionKey: false });

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