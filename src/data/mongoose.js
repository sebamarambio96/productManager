import mongoose from 'mongoose'

export async function connectMongo(params) {
    await mongoose.connect("mongodb+srv://sebamarambio:sY0rGCZdJevBBiQM@estudio.1agovhf.mongodb.net/Practica?retryWrites=true&w=majority")
    console.log(`Base de datos conectada.`)
}