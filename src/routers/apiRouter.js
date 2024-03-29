import { Router } from "express";
import { productsRouter } from "./productsRouter.js";
import { cartsRouter } from "./cartsRouter.js";
import { testRouter } from "./testRouter.js";
import { swaggerRouter } from "./swaggerRouter.js";
import { usersRouter } from "./usersRouter.js";

export const apiRouter = Router();

apiRouter.use("/products", productsRouter);
apiRouter.use("/carts", cartsRouter);
apiRouter.use("/test", testRouter);
apiRouter.use("/docs", swaggerRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/test", testRouter);
