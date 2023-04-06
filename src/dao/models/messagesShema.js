import mongoose from "mongoose";

const schemaMessages = new mongoose.Schema({
    user: { type: String, required: true },
    message: { type: String, required: true },
}, { versionKey: false })

class MessagesManager {
    #messagesDb
    constructor() {
        this.#messagesDb = mongoose.model('messages', schemaMessages)
    }

    async addMessage(messageData) {
        let newMessage = await this.#messagesDb.create(messageData)
        return newMessage
    }
    async getAll() {
        const allMessages = await this.#messagesDb.find().lean()
        return allMessages
    }
    async getByID(id) {
        const message = await this.#messagesDb.findById(id).lean()
        return message
    }
}

export const messagesManager = new MessagesManager()