import { Router } from "express";
import { getProducts, getProduct } from "../controllers/products.controller.js";

const router = Router()

//GET profile
router.get('/products', getProducts)

//GET profile
router.get('/products/:id', getProduct)

export default router