import { ProductManager } from "../../dao/managersFS/productManager.js";
import { Products } from "../../models/entities/products.js";
import { productsRepository } from "../../repositories/products.repository.js";
import { Logger } from "../../utils/winston.js";
export const productManager = new ProductManager("./src/data/productos.json");

//GET products wiith optional limit
export async function getProducts(req, res, next) {
    try {
        let products = await productsRepository.readMany({});
        req.query.limit && (products = products.slice(0, req.query.limit));
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
}

//GET one product by ID
export async function getProduct(req, res, next) {
    try {
        const { pid } = req.params;
        const product = await productsRepository.readOne({ _id: pid });
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
}

//ADD new product
export async function addProduct(req, res, next) {
    try {
        Logger.silly(req.body);
        const productReq = new Products(req.body);
        await productsRepository.create(productReq.dto());
        res.status(201).json({ message: "Producto agregado" });
    } catch (error) {
        next(error);
    }
}

//UPDATE product
export async function putProduct(req, res, next) {
    try {
        await productsRepository.updateOne({ _id: req.params.pid }, { ...req.body });
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

//DELETE product
export async function deleteProduct(req, res, next) {
    try {
        await productsRepository.deleteOne({ _id: req.params.pid });
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}
