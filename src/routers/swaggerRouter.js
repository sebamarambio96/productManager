import { Router } from "express"
import swaggerUi from 'swagger-ui-express';
import { specs } from "../config/swagger.config.js";
export const swaggerRouter = Router()

//GET cart by id
swaggerRouter.use('/', swaggerUi.serve, swaggerUi.setup(specs))
