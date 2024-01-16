import { createTransport } from "nodemailer";
import { EMAIL_PASS, EMAIL_USER } from "../config/env.config.js";
import { Logger } from "../utils/winston.js";
import hbs from "hbs";
import { promises as fs } from "fs";
import { resolve } from "path";

class EmailService {
    #clientNodemailer;

    constructor(credentialMail) {
        this.#clientNodemailer = createTransport({
            /* host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'ross.mckenzie67@ethereal.email',
                pass: 'JNTfHWvbQvpCWpfCGr'
            }, */
            service: "gmail",
            port: 587,
            auth: credentialMail,
            tls: {
                rejectUnauthorized: false,
            },
        });
    }
    async sendMail(from, to, subject, templateData) {
        // Construir la ruta completa hacia el archivo de plantilla
        const templatePath = resolve("./views/mails/emailTemplate1.hbs");

        // Cargar la plantilla Handlebars desde el archivo
        const template = await fs.readFile(templatePath, "utf-8");

        // Compilar la plantilla con los datos proporcionados
        const compiledTemplate = hbs.compile(template);
        const html = compiledTemplate(templateData);

        const mailOptions = {
            from,
            to,
            subject,
            html,
        };
        console.log(from);
        try {
            const info = await this.#clientNodemailer.sendMail(mailOptions);
            Logger.silly(info);
            return info;
        } catch (error) {
            Logger.silly(error);
            throw error;
        }
    }

    async sendRequest(to, message) {
        const mailOptions = {
            from: "Server Backend Js",
            to: to,
            subject: "Mail de consulta",
            text: message,
        };
        try {
            const info = await this.#clientNodemailer.sendMail(mailOptions);
            Logger.silly(info);
            return info;
        } catch (error) {
            Logger.silly(error);
            throw error;
        }
    }

    async passRecovery(to, token) {
        const message = `
        Código de recuperación de contraseña (Vigencia 24h)
            Su código de recuperación es: ${token}
        `;
        const mailOptions = {
            from: "Admin eccomerce",
            to: to,
            subject: "Recuperación Password",
            text: message,
        };
        try {
            const info = await this.#clientNodemailer.sendMail(mailOptions);
            Logger.silly(info);
            return info;
        } catch (error) {
            Logger.silly(error);
            throw error;
        }
    }
}

export const emailService = new EmailService({ user: EMAIL_USER, pass: EMAIL_PASS });
