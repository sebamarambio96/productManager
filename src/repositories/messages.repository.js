import { messagesDaoMongoose } from '../daos/messages.dao.mongoose.js'
import { GenericRepository } from './GenericRepository.js'

export const messagesRepository = new GenericRepository(messagesDaoMongoose)