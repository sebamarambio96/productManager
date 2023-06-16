import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { DaoMongoose } from "./DaoMongoose.js";

const schemaTickets = new mongoose.Schema({
    tittle: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true, default: 'Otros' },
    price: { type: Number, required: true },
    thumbnail: { type: String },
    code: { type: String, required: true },
    stock: { type: Number, required: true },
}, { versionKey: false })

schemaTickets.plugin(mongoosePaginate)

const modelTickets = mongoose.model('tickets', schemaTickets)

export const ticketsDaoMoongose = new DaoMongoose(modelTickets)