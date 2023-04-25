import { cartsManager } from "../dao/models/cartsShema.js"

//GET one product by ID
export async function setCookie(req, res, next) {
    try {
        res.cookie("cookie", "hola", {maxAge:10000}.send({ status: "success", message: "cookie set" }))
    } catch (error) {
        next(error)
    }
}
