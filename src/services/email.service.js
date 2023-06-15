import { createTransport } from 'nodemailer'
import { EMAIL_PASS, EMAIL_USER } from '../config/env.config.js'

class EmailService {
    #clientNodemailer

    constructor(credentialMail) {
        this.#clientNodemailer = createTransport({
            /* host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'ross.mckenzie67@ethereal.email',
                pass: 'JNTfHWvbQvpCWpfCGr'
            }, */
            service: 'gmail',
            port: 587,
            auth: credentialMail,
            tls: {
                rejectUnauthorized: false
            }
            
        })
    }

    async send(to, message) {
        const mailOptions = {
            from: 'Admin eccomerce',
            to: to,
            subject: 'Mail de consulta',
            text: message,
        }
        try {
            const info = await this.#clientNodemailer.sendMail(mailOptions)
            console.log(info)
            return info
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}

export const emailService = new EmailService({ user: EMAIL_USER, pass: EMAIL_PASS })