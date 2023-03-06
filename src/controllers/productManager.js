import fs from "fs/promises"

export class ProductManager {
    constructor(path) {
        this.path = path
    }
    async getProducts() {
        try {
            let data = await fs.readFile(this.path)
            let products = JSON.parse(data)
            if (products.length === 0) {
                await this.format()
            }
            return products
        } catch (error) {
            console.log(error.message)
        }
    }
    async format() {
        const format = [
            {
                "id": 0,
                "count": [
                ]
            }
        ]
        await this.saveProducts(format)
        console.log('Archivo formateado')
    }
    async saveProducts(data) {
        try {
            await fs.writeFile(this.path, JSON.stringify(data), 'utf8')
        } catch (error) {
            console.log(error.message)
        }
    }
    async addProduct(object) {
        try {
            //VALIDATE fields
            if (!Object.values(object).every(value => value != '')) {
                throw new Error("Debes rellenar todos los campos")
            } else {
                //VALIDATE code
                const arrayProducts = await this.getProducts()
                const result = arrayProducts.find(item => item.code === object.code)
                if (result) {
                    throw new Error('El codigo ingresado ya existe')
                } else {
                    while (true) {
                        let numRandom = Math.round(Math.random() * 3000000000);
                        if (arrayProducts[0].count.indexOf(numRandom) === -1) {
                            arrayProducts[0].count.push(numRandom)
                            arrayProducts.push({ ...object, id: arrayProducts[0].count.at(-1) })
                            await this.saveProducts(arrayProducts)
                            return false
                        }
                    }
                }
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    async getProductById(id) {
        try {
            const arrayProducts = await this.getProducts()
            const product = arrayProducts.filter(item => item.id === parseInt(id))
            console.log(product)
            // VERIFY EXISTENCE
            if (product.length === 0) {
                throw new Error('Producto no encontrado')
            } else {
                return product
            }
        } catch (error) {
            console.log(error.message)
        }

    }
    async updateProduct(id, object) {
        try {
            const { tittle, description, price, thumbnail, code, stock } = object
        const arrayProducts = await this.getProducts()
        const product = arrayProducts.filter(item => item.id === parseInt(id))
        const idx = arrayProducts.indexOf(...product)
        // VERIFY EXISTENCE
        if (product.length === 0) {
            throw new Error('Producto no encontrado')
        } else {
            const newProduct = {
                id,
                tittle,
                description,
                price,
                thumbnail,
                code,
                stock
            }
            arrayProducts[idx] = newProduct
            await this.saveProducts(arrayProducts)
            console.log('Producto actualizado')
        }
        } catch (error) {
            console.log(error.message)
        }
        
    }

    async deleteProduct(id) {
        try {
            const arrayProducts = await this.getProducts()
            const product = arrayProducts.filter(item => item.id === parseInt(id))
            // VERIFY EXISTENCE
            if (product.length === 0) {
                throw Error('Producto no encontrado')
            } else {
                const newArray = arrayProducts.filter(item => item.id !== parseInt(id))
                const newCount = arrayProducts[0].count.filter(item => item !== parseInt(id))
                newArray[0].count = newCount
                await this.saveProducts(newArray)
                console.log('Producto eliminado')
            }
        } catch (error) {
            console.log(error.message)
        }
    }
}

//Instance for initialize
/* const productManager = new ProductManager('./data/productos.json') */
/* productManager.format() */
/* productManager.getProducts()
    .then(res => console.log(res)) */


/* productManager.addProduct({
    tittle: "producto prueba",
    description: "Este es un producto prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "abc83",
    stock: 25
}).then(res => console.log('Producto agregado')) */

/* productManager.updateProduct(512274163, {
    tittle: "producto prueba modificado",
    description: "Este es un producto prueba  modificado",
    price: 2002,
    thumbnail: "Sin imagen modificado",
    code: "abc8899 modificado 2",
    stock: 25
}) */

/* productManager.deleteProduct(512274163) */
/* productManager.getProductById(1479287124).then(res => console.log(res)) */