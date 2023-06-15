import { messagesRepository } from "../repositories/messages.repository.js"

export class MessagesService {
    constructor(messagesRepository) {
        this.repo = messagesRepository
    }
}

export const messagesService = new MessagesService(messagesRepository)
