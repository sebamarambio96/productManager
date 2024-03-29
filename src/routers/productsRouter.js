import { Router } from "express";
import { getProducts, getProduct, addProduct, putProduct, deleteProduct } from "../controllers/productsController.js";
import { onlyPremium } from "../controllers/profileControllers.js";

export const productsRouter = Router();

//GET products
productsRouter.get("/", getProducts);

//GET product by id
productsRouter.get("/:pid", getProduct);

//ADD new product
productsRouter.post("/", onlyPremium, addProduct);

//UPDATE product info
productsRouter.put("/:pid", putProduct);

//DELETE product
productsRouter.delete("/:pid", onlyPremium, deleteProduct);
