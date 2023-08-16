import { cartsRepository } from "../repositories/carts.repository.js";
import { usersRepository } from "../repositories/users.repository.js";
import { cartsService } from "../services/carts.service.js";
import { ticketsService } from "../services/tickets.service.js";
import { decryptJWT } from "../utils/jwt.js";

//GET one product by ID
export async function getCart(req, res, next) {
    try {
        const { cid } = req.params;
        const cart = await cartsRepository.readOnePopulated({ _id: cid },"cartProducts.product");
        if (!cart) throw new Error("ID no existe");
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
}

//ADD new cart
export async function addCart(req, res, next) {
    try {
        //Validate token
        let cart
        if (req.cookies.accessToken) {
            const { id } = await decryptJWT(req.cookies.accessToken);
            //If user don´t have cart, set it
            const user = await usersRepository.readOne({ _id: id });
            if (user.cart === "") {
                cart = await cartsRepository.create({});
                usersRepository.updateOne({ _id: id }, { cart: cart._id });
            }
        } else {
            cart = await cartsRepository.create({});
        }
        res.status(201).json(cart);
    } catch (error) {
        next(error);
    }
}

//ADD products
export async function addProducts(req, res, next) {
    const { quantity } = req.body;
    const { cid, pid } = req.params;
    try {
        await cartsService.addProducts(cid, pid, quantity);
        res.status(201).json({ message: "Producto actualizado/agregado" });
    } catch (error) {
        next(error);
    }
}

//Delete products
export async function deleteProduct(req, res, next) {
    const { cid, pid } = req.params;
    try {
        await cartsService.deleteProduct(cid, pid);
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
        next(error);
    }
}
