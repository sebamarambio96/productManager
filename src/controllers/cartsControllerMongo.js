import { cartsManager } from "../dao/cartsShema.js";
import { usersRepository } from "../repositories/users.repository.js";
import { ticketsService } from "../services/tickets.service.js";
import { decryptJWT } from "../utils/jwt.js";

//GET one product by ID
export async function getCart(req, res, next) {
    try {
        const { cid } = req.params;
        const cart = await cartsManager.getByID(cid);
        if (!cart) throw new Error("ID no existe");
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
}

//ADD new cart
export async function addCart(req, res, next) {
    try {
        const cart = await cartsManager.addCart();
        //Validate token
        const { id } = await decryptJWT(req.cookies.accessToken);
        //If user don´t have cart, set it
        const user = await usersRepository.readOne({ _id: id });
        if (user.cart === "") {
            usersRepository.updateOne({ _id: id }, { cart: cart._id });
        }
        console.log(cart);
        res.status(201).json({ cart });
    } catch (error) {
        next(error);
    }
}

//ADD products
export async function addProducts(req, res, next) {
    try {
        await cartsManager.addProducts(req.params.cid, req.params.pid);
        res.status(201).json({ message: "Producto actualizado/agregado" });
    } catch (error) {
        next(error);
    }
}

//Delete products
export async function deleteProduct(req, res, next) {
    try {
        await cartsManager.deleteProduct(req.params.cid, req.params.pid);
        res.status(201).json({ message: "Producto eliminado" });
    } catch (error) {
        next(error);
    }
}

//Purchase
export async function purchase(req, res, next) {
    try {
        const { cid, purchaser, role } = req.body;
        const ticket = await ticketsService.purchase(cid, purchaser, role);
        res.status(201).json(ticket);
    } catch (error) {
        console.log(error)
        next(error);
    }
}
