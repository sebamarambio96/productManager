import { createTransport } from "nodemailer";
import { EMAIL_PASS, EMAIL_USER } from "../config/env.config.js";

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
    async sendMail(from, to, subject, text) {
        const mailOptions = {
            from,
            to,
            subject,
            text,
        };
        try {
            const info = await this.#clientNodemailer.sendMail(mailOptions);
            console.log(info);
            return info;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async sendRequest(to, message) {
        const mailOptions = {
            from: "Admin eccomerce",
            to: to,
            subject: "Mail de consulta",
            text: message,
        };
        try {
            const info = await this.#clientNodemailer.sendMail(mailOptions);
            console.log(info);
            return info;
        } catch (error) {
            console.log(error);
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
            console.log(info);
            return info;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export const emailService = new EmailService({ user: EMAIL_USER, pass: EMAIL_PASS });
