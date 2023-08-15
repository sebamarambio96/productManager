import mongoose from "mongoose";
import { DaoMongoose } from "./DaoMongoose.js";

const validRoles = ["user", "premium", "admin"];

const schemaUsers = new mongoose.Schema(
    {
        first_name: { type: String },
        last_name: { type: String },
        age: { type: Number },
        cart: { type: String, default: "" },
        role: {
            type: String,
            default: "user",
            validate: {
                validator: function (value) {
                    return validRoles.includes(value);
                },
                message: (props) => `${props.value} no es un valor válido para el campo 'role'`,
            },
        },
        user: { type: String, required: true },
        pass: { type: String },
        documents: [
            {
                name: String,
                reference: String,
            },
        ],
        last_connection: { type: Date },
        profileImg: { type: String },
    },
    { versionKey: false }
);

const modelUsers = mongoose.model("users", schemaUsers);

export const usersDaoMoongose = new DaoMongoose(modelUsers);
