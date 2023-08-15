import mongoose from "mongoose";
import { DaoMongoose } from "./DaoMongoose.js";

const schemaMessages = new mongoose.Schema(
    {
        user: { type: String, required: true },
        message: { type: String, required: true },
    },
    { versionKey: false }
);

const modelMessages = mongoose.model("messages", schemaMessages);

export const messagesDaoMoongose = new DaoMongoose(modelMessages);
