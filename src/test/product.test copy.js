import { Products } from "../models/entities/products.js";
import { ProductsService } from "../services/products.service.js";
import { randomString } from "../utils/randomUUID.js";

/* const productRepositoryMock = {
    create: product => { console.log('Se ha creado el producto correctamente') }
}

const reqBodySimulado = {
    title: "producto prueba actualizado 3",
    description: "Este es un producto prueba",
    price: 300,
    thumbnail: ["11asda12312.jpg"],
    code: `${randomString()}`,
    stock: 25
}

const productService = new ProductService(productRepositoryMock)

const newProduct = new Products(reqBodySimulado)

const res = await productService.addProduct(newProduct.dto())

console.log(res)
 */
export async function mocking100Products(req, res, next) {
    try {
        const productRepositoryMock = {
            create: product => { console.log('Se han creado 100 productos falsos') }
        }

        const tenTenProducts = []

        for (let i = 0; i <= 100; i++) {
            const simulatedProduct = {
                title: "producto prueba actualizado " + i.toString(),
                description: "Este es un producto prueba" + i.toString(),
                price: 300 + i,
                thumbnail: [`11asda12312numero${i}.jpg`],
                code: `${randomString()}`,
                stock: 25 + i
            }
            const validatedProduct = new Products(simulatedProduct)
            tenTenProducts.push(validatedProduct.dto());
        }
        const productService = new ProductsService(productRepositoryMock)
        await productService.addProduct(tenTenProducts)
        res.status(200).json(tenTenProducts)
    } catch (error) {
        next(error)
    }
}