import { ErrorInvalidArgument } from "../models/errors/invalidArgument.js";
import { ErrorNotFound } from "../models/errors/notFound.js";
import { usersRepository } from "../repositories/users.repository.js";
import { emailService } from "../services/email.service.js";
import { encryptPass, validPass } from "../utils/bcrypt.js";
import { decryptJWT, encryptJWT } from "../utils/jwt.js";
import { Logger } from "../utils/winston.js";

export async function sendMail(req, res, next) {
    const { to, message } = req.body;

    try {
        const info = await emailService.sendRequest(to, message);
    } catch (error) {
        next(error);
    }

    res.redirect("/");
}

// Definir la función del controlador
export async function sendRequestPortfolio(req, res, next) {
    const { name, email, subject, message } = req.body;

    try {
        const info = await emailService.sendMail(`Portfolio: ${name} ${email}` , 'sebams.dev@gmail.com', subject, message);

        res.status(200).json({ success: true, message: "Correo enviado con éxito" });
    } catch (error) {
        next(error);
    }
}

export async function passRecoveryMail(req, res, next) {
    const { username } = req.body;
    try {
        //Find user data
        const userData = await usersRepository.readOne({ user: username });
        if (!userData) throw new ErrorNotFound("Username no existe");
        //Create token  24h that expires in 24h
        const token = await encryptJWT({ id: userData._id });
        const info = await emailService.passRecovery(username, token);
        Logger.silly(info);
        res.status(201).json({ info, message: "Un correo con su código de recuperación ha sido enviado, recuerde revisar SPAM." });
    } catch (error) {
        next(error);
    }
}

export async function passRecoveryVerify(req, res, next) {
    const { token, pass } = req.body;
    try {
        //Verify token
        const { id } = await decryptJWT(token);
        //Find user data
        const userData = await usersRepository.readOne({ _id: id });
        if (!userData) throw new ErrorNotFound("Username no existe");
        if (validPass(userData.pass, req.body)) throw new ErrorInvalidArgument("No puede ser la misma contraseña");
        usersRepository.updateOne({ _id: id }, { pass: encryptPass(pass) });
        await res.status(201).json({ message: "Contraseña actualizada exitosamente" });
    } catch (error) {
        next(error);
    }
}
