import mongoose from 'mongoose'
import { MONGO_BBDD, MONGO_BBDD_TEST, MONGO_PASS, MONGO_SERVER, MONGO_USER, NODE_ENV } from './env.config.js'
import { Logger } from '../utils/winston.js'

//Select database to use
const database = NODE_ENV === "test" ? MONGO_BBDD_TEST : MONGO_BBDD
const cnx_string = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_SERVER}/${database}?retryWrites=true&w=majority`

export async function connectMongo() {
    await mongoose.connect(cnx_string)
    Logger.silly(`Base de datos conectada: ${database}`)
}