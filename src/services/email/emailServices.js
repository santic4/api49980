import nodemailer from 'nodemailer'
import { EMAIL_USER, EMAIL_PASS } from '../../config/config.js'

const transport = nodemailer.createTransport({
    service: 'gmail',
    port:587,
    auth:{
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
})


class EmailService {

    async send(destinatario, asunto, mensaje){

        const emailOptions ={
            from: EMAIL_USER,
            to: destinatario,
            subject: asunto,
            text: mensaje
        }
        
        await transport.sendMail(emailOptions)
        console.log(emailOptions)

    }

}

export const emailService = new EmailService()