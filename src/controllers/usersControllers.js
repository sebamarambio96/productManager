import { Users } from "../models/entities/users.js";
import { ErrorInvalidArgument } from "../models/errors/invalidArgument.js";
import { ErrorNotFound } from "../models/errors/notFound.js";
import { usersRepository } from "../repositories/users.repository.js";
import { usersService } from "../services/users.service.js";

export async function getUsers(req, res, next) {
    try {
        const users = await usersRepository.readMany({});

        const usersBasicInfo = users.map((user) => {
            console.log(user);
            let userDto = new Users({
                _id: user._id,
                user: user.user || "Sin registrar",
                pass: user.pass || "Sin registrar",
                first_name: user.first_name || "Sin registrar",
                last_name: user.last_name || "Sin registrar",
                age: user.age || 1,
                cart: user.cart || "Sin registrar",
                role: user.role || "Sin registrar",
            });
            userDto = userDto.dtoBasic();
            return userDto;
        });

        res.status(200).json(usersBasicInfo);
    } catch (error) {
        next(error);
    }
}

export async function changeRole(req, res, next) {
    try {
        const { uid } = req.params;
        //Verify existence of user
        const userData = await usersRepository.readOne({ _id: uid });

        let newRole = "";
        if (userData.role === "premium") {
            newRole = "user";
        } else {
            //Verify documents
            if (userData.documents.length < 3) throw new ErrorInvalidArgument("El usuario no tiene los documentos necesarios");
            newRole = "premium";
        }

        usersService.changeRole(uid, newRole);
        res.status(200).json({ message: "Rol de usuario actualizado" });
    } catch (error) {
        next(error);
    }
}

export async function uploadDocuments(req, res, next) {
    // Array of uploaded files
    const uploadedImages = req.files;
    //User ID
    const { uid } = req.params;
    try {
        const user = await usersRepository.readOne({ _id: uid });

        if (!user) throw new ErrorNotFound("Usuario no encontrado");
        /* console.log(uploadedImages); */
        // Process uploaded files and update user
        if (!uploadedImages) throw new ErrorInvalidArgument("No se han subido documentos");
        if (!user.documents) user.documents = [];
        uploadedImages.forEach((Image) => {
            user.documents.push({
                name: Image.originalname,
                reference: Image.path,
            });
        });

        await usersRepository.updateOne({ _id: uid }, { ...user });

        return res.status(200).json({ message: "Documentos subido con exito" });
    } catch (error) {
        next(error);
    }
}

export async function uploadProfile(req, res, next) {
    //User ID
    const { uid } = req.params;
    try {
        const user = await usersRepository.readOne({ _id: id });

        if (!user) throw new ErrorNotFound("Usuario no encontrado");
        if (!req.file) throw new ErrorInvalidArgument("No se ha subido una imagen");
        await usersRepository.updateOne({ _id: uid }, { profileImg: req.file.path });

        return res.status(200).json({ message: "Imagen de perfil subida con exito" });
    } catch (error) {
        next(error);
    }
}
