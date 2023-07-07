import { cartsManager } from "../dao/cartsShema.js"
import { messagesManager } from "../dao/messagesShema.js"
import { productsManager } from "../dao/productsShema.js"
import { Messages } from "../models/entities/messages.js"
import { Products } from "../models/entities/products.js"
/* import { productManager } from "./productsController.js" */

export async function ioManager(io) {
    // Script para pasar de json a MongoDb
    /* let products = await productManager.getProducts()
    await productsManager.addManyProducts(products) */

    io.on('connection', async clientSocket => {
        console.log(`Nuevo cliente conectado! socket id# ${clientSocket.id}`)
        clientSocket.emit('updateProducts', await productsManager.getAll())
        //PRODUCTS

        //New product
        clientSocket.on('newProduct', async product => {
            try {
                console.log(product);
                product.price = parseInt(product.price)
                const productReq = new Products(product)
                console.log(productReq)
                await productsManager.addProduct(productReq.dto())
                clientSocket.emit('updateProducts', await productsManager.getAll())
            } catch (error) {
                console.log(error);
                console.log(error);
            }
        })
        //Update product
        clientSocket.on('updateProduct', async product => {
            try {
                const productReq = new Products(product)
                await productsManager.updateByID(product._id, productReq.dto())
                clientSocket.emit('updateProducts', await productsManager.getAll())
            } catch (error) {
                console.log(error);
            }
        })
        //Delete Product
        clientSocket.on('deleteProduct', async item => {
            try {
                await productsManager.deleteByID(item.id)
                clientSocket.emit('updateProducts', await productsManager.getAll())
            } catch (error) {
                console.log(error);
            }
        })

        //CHAT
        clientSocket.emit('updateMessage', await messagesManager.getAll())
        clientSocket.on('newMessage', async message => {
            try {
                const messageReq = new Messages(message)
                await messagesManager.addMessage(messageReq.dto())
                clientSocket.emit('updateMessage', await messagesManager.getAll())
            } catch (error) {
                console.log(error);
            }
        })
        //Avisa a los demás que alguien entra
        clientSocket.on('newUser', async username => {
            try {
                clientSocket.broadcast.emit('newUser', username)
            } catch (error) {
                console.log(error);
            }
        })
        clientSocket.on('updateCart', async cid => {
            try {
                const cart = await cartsManager.getByID(cid)
                clientSocket.emit('updateCart', cart)
            } catch (error) {
                console.log(error);
            }
        })
    })
}

