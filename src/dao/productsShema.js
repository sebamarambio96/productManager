import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { DaoMongoose } from "./DaoMongoose.js";

const schemaProducts = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        category: { type: String, required: true, default: "Otros" },
        price: { type: Number, required: true },
        thumbnail: { type: Array },
        code: { type: String, required: true },
        stock: { type: Number, required: true },
        owner: { type: String, required: true },
    },
    { versionKey: false }
);

schemaProducts.plugin(mongoosePaginate);

const modelProducts = mongoose.model("products", schemaProducts);

export const productsDaoMoongose = new DaoMongoose(modelProducts);
