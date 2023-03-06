import express from "express";
import productRoutes from "./routes/products.routes.js";
import cors from 'cors';

const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(productRoutes)

export default app
