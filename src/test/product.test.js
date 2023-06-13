import { Products } from "../entities/products.js";
import { ProductService } from "../services/product.service.js";
import { randomString } from "../utils/randomUUID.js";

const productRepositoryMock = {
    create: product => {console.log('Se ha creado el producto correctamente')}
}

const reqBodySimulado = {
    tittle: "producto prueba actualizado 3",
    /* description: "Este es un producto prueba", */
    price: 300,
    thumbnail: ["11asda12312.jpg"],
    code: `${randomString()}`,
    stock: 25
}

const productService = new ProductService(productRepositoryMock)

const newProduct = new Products(reqBodySimulado)

const res = await productService.addProduct(newProduct.dto())

console.log(res)