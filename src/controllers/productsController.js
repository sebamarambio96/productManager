import { Products } from "../models/entities/products.js";
import { ErrorInvalidArgument } from "../models/errors/invalidArgument.js";
import { ErrorNotFound } from "../models/errors/notFound.js";
import { productsRepository } from "../repositories/products.repository.js";
import { usersRepository } from "../repositories/users.repository.js";
import { emailService } from "../services/email.service.js";
import { decryptJWT } from "../utils/jwt.js";
import { Logger } from "../utils/winston.js";

//GET products wiith optional limit
export async function getProducts(req, res, next) {
    try {
        let products = await productsRepository.readMany({});
        req.query.limit && (products = products.slice(0, req.query.limit));
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
}

//GET one product by ID
export async function getProduct(req, res, next) {
    try {
        const { pid } = req.params;
        const product = await productsRepository.readOne({ _id: pid });
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
}

//ADD new product
export async function addProduct(req, res, next) {
    try {
        Logger.silly(req.body);
        const productReq = new Products(req.body);
        await productsRepository.create(productReq.dto());
        res.status(201).json({ message: "Producto agregado" });
    } catch (error) {
        next(error);
    }
}

//UPDATE product
export async function putProduct(req, res, next) {
    try {
        await productsRepository.updateOne({ _id: req.params.pid }, { ...req.body });
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

//DELETE product
export async function deleteProduct(req, res, next) {
    try {
        //Verify token
        const { id } = await decryptJWT(req.cookies.accessToken);
        //Find user data
        const userData = await usersRepository.readOne({ _id: id });
        if (!userData) throw new ErrorNotFound("Username no existe");
        //Find product
        const productData = await productsRepository.readOne({ _id: req.params.pid });
        if (!userData) throw new ErrorNotFound("Producto no existe");
        let message;
        //Validate owner
        if (userData.user == productData.owner || productData.owner == "adminCoder@coder.com") {
            await productsRepository.deleteOne({ _id: req.params.pid });
            message = "Producto eliminado";
            emailService.sendMail(
                "Admin eccomerce",
                userData.user,
                `Eliminación de producto #ID: ${productData._id}`,
                `Se ha eliminado el producto con Nombre: "${productData.title}" y ID: "${productData._id}"`
            );
        } else {
            message = "Solo el dueño o el admin puede eliminar este producto";
        }
        res.status(201).json({ message });
    } catch (error) {
        next(error);
    }
}

export async function uploadThumbnail(req, res, next) {
    const { pid } = req.params;
    const uploadedFiles = req.files;
    const { id } = req.session.user;
    try {
        const product = await productsRepository.readOne({ _id: pid });

        // Identify user

        const userData = await usersRepository.readOne({ _id: id });
        if (!userData) throw new ErrorNotFound("Usuario no encontrado");
        if (!product) throw new ErrorNotFound("Producto no existe");

        //Validate owner

        if (product.owner == userData.user) throw new ErrorNotFound("No eres el dueño del producto");

        // Save the name in "thumbnail"
        let arrayImg = product.thumbnail;
        if (!uploadedFiles) throw new ErrorInvalidArgument("No se han subido imagenes");
        uploadedFiles.forEach((file) => arrayImg.push(file.path));

        await productsRepository.updateOne({ _id: pid }, { thumbnail: arrayImg });

        return res.status(200).json({ message: "Imagenes subidas correctamente" });
    } catch (error) {
        next(error);
    }
}
