import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(__dirname, "../../.env") })


//Create a configuration object
let config = {
    service: "gmail",
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
}

//Create a transporter
function createTransporter(config: any) {
    return nodemailer.createTransport(config)
}


//Send Email
export async function sendEmail(messageOption: any) {
    let transporter = createTransporter(config)
    await transporter.verify()
    await transporter.sendMail(messageOption, (err, info) => {
        if (err) {
            console.log(err)
        } console.log(info);

    })
}

