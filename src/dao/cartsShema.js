import mongoose, { Schema } from "mongoose";
import { DaoMongoose } from "./DaoMongoose.js";

const schemaCarts = new mongoose.Schema(
    {
        cartProducts: {
            type: [
                {
                    product: {
                        type: Schema.Types.ObjectId,
                        ref: "products",
                    },
                    quantity: { type: Number, default: 0 },
                },
            ],
            default: [],
        },
    },
    { versionKey: false }
);

const modelCarts = mongoose.model("carts", schemaCarts);

export const cartsDaoMoongose = new DaoMongoose(modelCarts);
