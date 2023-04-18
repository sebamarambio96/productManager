import mongoose from 'mongoose'
import { productsManager } from '../dao/models/productsShema.js';

export async function connectMongo(params) {
    await mongoose.connect("mongodb+srv://sebamarambio:sY0rGCZdJevBBiQM@estudio.1agovhf.mongodb.net/Practica?retryWrites=true&w=majority")
    console.log(`Base de datos conectada.`)
}