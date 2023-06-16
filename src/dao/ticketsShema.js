import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { DaoMongoose } from "./DaoMongoose.js";

const schemaTickets = new mongoose.Schema({
    code: { type: String, required: true },
    purchase_datetime: { type: String, required: true },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
}, { versionKey: false })

schemaTickets.plugin(mongoosePaginate)

const modelTickets = mongoose.model('tickets', schemaTickets)

export const ticketsDaoMoongose = new DaoMongoose(modelTickets)