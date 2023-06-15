import mongoose from 'mongoose'
import { MONGO_BBDD, MONGO_PASS, MONGO_SERVER, MONGO_USER } from './env.config.js'

export async function connectMongo() {
    await mongoose.connect(
        `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_SERVER}/${MONGO_BBDD}?retryWrites=true&w=majority`
    )
    console.log(`Base de datos conectada.`)
}