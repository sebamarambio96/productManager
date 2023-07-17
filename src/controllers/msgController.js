import { emailService } from '../services/email.service.js'
/* import { smsService } from '../services/sms.service.js' */

export async function sendMail(req, res, next) {
    const { to, message } = req.body

    try {
        const info = await emailService.send(to, message)
        // await smsService.send('431321312','holaaa')
        console.log(info)
    } catch (error) {
        console.log(error)
    }

    res.redirect('/')
}

export async function passRecovery(req, res, next) {
    const { to, message } = req.body
    try {
        const info = await emailService.send(to, message)
        // await smsService.send('431321312','holaaa')
        console.log(info)
    } catch (error) {
        console.log(error)
    }
    res.redirect('/')
}