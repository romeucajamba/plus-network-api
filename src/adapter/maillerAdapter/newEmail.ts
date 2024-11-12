import nodemailer from 'nodemailer'
import { env } from '../../infra/config/env'

const transporter=nodemailer.createTransport({
       service:"gmail",
       auth:{
            user:env.EMAIL_USER,
            pass:env.EMAIL_PASSWORD,
       }
})

export const email = () => {
    transporter.verify((error,success)=>{
        if(error)
            console.log(error)
        console.log('estou conectado', success)
    })
}