import fs from "fs/promises";
import { ErrorInvalidArgument } from "../../models/errors/invalidArgument.js";
import { Logger } from "../../utils/winston.js";

export class ProductManager {
    constructor(path) {
        this.path = path;
    }
    async getProducts() {
        let data = await fs.readFile(this.path);
        let products = JSON.parse(data);
        return products;
    }

    async getProductById(id) {
        const arrayProducts = await this.getProducts();
        const product = arrayProducts.filter((item) => item.id === parseInt(id));
        // VERIFY EXISTENCE
        if (product.length === 0) throw new Error("ID no existe");
        return product;
    }

    async saveProducts(data) {
        await fs.writeFile(this.path, JSON.stringify(data, null, 4), "utf8");
    }

    async addProduct(object) {
        object.status = true;
        !object.thumbnail && (object.thumbnail = "Sin imagen");
        //VALIDATE fields
        if (!Object.values(object).every((value) => value != "")) throw new ErrorInvalidArgument("Falta un argumento");
        //VALIDATE code
        const arrayProducts = await this.getProducts();
        const result = arrayProducts.find((item) => item.code === object.code);
        if (result) throw new Error("El codigo ingresado ya existe");
        arrayProducts.length === 0 ? (object.id = 1) : (object.id = arrayProducts[arrayProducts.length - 1].id + 1);
        arrayProducts.push(object);
        await this.saveProducts(arrayProducts);
        Logger.silly("Producto añadido");
    }

    async updateProduct(id, newData) {
        const arrayProducts = await this.getProducts();
        const product = arrayProducts.filter((item) => item.id === parseInt(id));
        const idx = arrayProducts.indexOf(...product);
        // VERIFY EXISTENCE
        if (product.length === 0) throw new Error("ID no existe");
        const newProduct = {
            id: parseInt(id),
            ...newData,
        };
        arrayProducts[idx] = newProduct;
        await this.saveProducts(arrayProducts);
        Logger.silly("Producto actualizado");
    }

    async deleteProduct(id) {
        const arrayProducts = await this.getProducts();
        const product = arrayProducts.filter((item) => item.id === parseInt(id));
        // VERIFY EXISTENCE
        if (product.length === 0) throw Error("ID no existe");
        const newArray = arrayProducts.filter((item) => item.id !== parseInt(id));
        await this.saveProducts(newArray);
        Logger.silly("Producto eliminado");
    }
}

//Instance for initialize
/* const productManager = new ProductManager('./src/data/productos.json') */

/* productManager.addProduct({
    title: "producto prueba nueva",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc1341232",
    stock: 25
}).then(res => Logger.silly('Producto agregado')) */

/* productManager.updateProduct(512274163, {
    title: "producto prueba modificado",
    description: "Este es un producto prueba  modificado",
    price: 2002,
    thumbnail: "Sin imagen modificado",
    code: "abc8899 modificado 2",
    stock: 25
}) */
