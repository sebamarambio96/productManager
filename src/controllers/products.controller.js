import { ProductManager } from "./productManager.js";
const productManager = new ProductManager('./src/data/productos.json')

//GET products wiith optional limit
export async function getProducts(req, res) {
    try {
        console.log(req.query.limit)
        let products = await productManager.getProducts()
        products.shift()
        if (req.query.limit) {
            products = products.slice(0,req.query.limit)
        }
        res.status(200).json(products)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

//GET one product by ID
export async function getProduct(req, res) {
    try {
        const {id} = req.params
        const product = await productManager.getProductById(id)
        if (!product) return res.status(404).json({ message: 'Producto no existe' })
        res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
