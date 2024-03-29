import { Products } from "../src/models/entities/products.js";
import { ProductsService } from "../src/services/products.service.js";
import { logger } from "../src/utils/logger.js";
import { randomString } from "../src/utils/randomUUID.js";
import { Logger } from "../src/utils/winston.js";

export async function mocking100Products(req, res, next) {
    try {
        const productRepositoryMock = {
            create: (product) => {
                Logger.silly("Se han creado 100 productos falsos");
            },
        };

        const tenTenProducts = [];

        for (let i = 0; i <= 100; i++) {
            const simulatedProduct = {
                title: "producto prueba actualizado " + i.toString(),
                description: "Este es un producto prueba" + i.toString(),
                price: 300 + i,
                thumbnail: [`11asda12312numero${i}.jpg`],
                code: `${randomString()}`,
                stock: 25 + i,
            };
            const validatedProduct = new Products(simulatedProduct);
            tenTenProducts.push(validatedProduct.dto());
        }
        const productService = new ProductsService(productRepositoryMock);
        await productService.addProduct(tenTenProducts);
        res.status(200).json(tenTenProducts);
    } catch (error) {
        next(error);
    }
}

export async function loggerTest(req, res, next) {
    try {
        logger.log("mensaje de error de prueba", 6);
        res.status(200).json({});
    } catch (error) {
        next(error);
    }
}

export async function winston(req, res, next) {
    try {
        Logger.silly("mensaje de error de prueba nivel error 0");
        res.status(200).json({});
    } catch (error) {
        next(error);
    }
}
