import { GenericRepository } from "./GenericRepository.js";
import { messagesDaoMoongose } from "../dao/messagesShema.js";

class MessagesRepository extends GenericRepository {
    constructor(dao) {
        super(dao);
    }
}

export const messagesRepository = new MessagesRepository(messagesDaoMoongose);
