import { productsManager } from "../dao/productsShema.js";
import { Messages } from "../models/entities/messages.js";
import { Products } from "../models/entities/products.js";
import { cartsRepository } from "../repositories/carts.repository.js";
import { messagesRepository } from "../repositories/messages.repository.js";
import { usersRepository } from "../repositories/users.repository.js";
import { Logger } from "../utils/winston.js";

export async function ioManager(io) {
    // Script para pasar de json a MongoDb

    io.on("connection", async (clientSocket) => {
        Logger.silly(`Nuevo cliente conectado! socket id# ${clientSocket.id}`);

        //Users
        clientSocket.on("updateUsers", async () => {
            try {
                clientSocket.emit("updateUsers", await usersRepository.readMany({}));
            } catch (error) {
                Logger.error(error);
            }
        });
        //PRODUCTS

        //New product
        clientSocket.emit("updateProducts", await productsManager.getAll());
        clientSocket.on("newProduct", async (product) => {
            try {
                //Validate owner
                const userData = await usersRepository.readOne({ user: product.owner });
                if (!userData) throw new ErrorNotFound("Username no existe");
                /* Logger.error(product); */
                product.price = parseInt(product.price);
                const productReq = new Products(product);
                /* Logger.error(productReq) */
                await productsManager.addProduct(productReq.dto());
                clientSocket.emit("updateProducts", await productsManager.getAll());
            } catch (error) {
                Logger.error(error);
            }
        });
        //Update product
        clientSocket.on("updateProduct", async (product) => {
            try {
                const productReq = new Products(product);
                await productsManager.updateByID(product._id, productReq.dto());
                clientSocket.emit("updateProducts", await productsManager.getAll());
            } catch (error) {
                Logger.error(error);
            }
        });
        //Delete Product
        clientSocket.on("deleteProduct", async (item) => {
            try {
                await productsManager.deleteByID(item.id);
                clientSocket.emit("updateProducts", await productsManager.getAll());
            } catch (error) {
                Logger.error(error);
            }
        });

        //CHAT
        clientSocket.emit("updateMessage", await messagesRepository.readMany({}));
        clientSocket.on("newMessage", async (message) => {
            try {
                const messageReq = new Messages(message);
                await await messagesRepository.create({...messageReq.dto()});
                clientSocket.emit("updateMessage", await messagesRepository.readMany({}));
            } catch (error) {
                Logger.error(error);
            }
        });
        //Avisa a los demás que alguien entra
        clientSocket.on("newUser", async (username) => {
            try {
                clientSocket.broadcast.emit("newUser", username);
            } catch (error) {
                Logger.error(error);
            }
        });
        clientSocket.on("updateCart", async (cid) => {
            try {
                const cart = await cartsRepository.readOne({ _id: cid });
                clientSocket.emit("updateCart", cart);
            } catch (error) {
                Logger.error(error);
            }
        });
    });
}
