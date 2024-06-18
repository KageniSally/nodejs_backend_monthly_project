import { DBHelper } from "../DBHelpers"
import ejs from 'ejs'
import { sendEmail } from "../Helpers";
import { Request, Response } from "express"


const dbInstance = new DBHelper
export interface User {
    id: string,
    email: string,
    name: string,
    role_id: number,
    password: string,
    isDeleted: number,
    isEmailSent: number
}
export interface Bookings {
    id: string,
    user_id: string,
    tour_id: string,
    hotel_id: string,
    date: string
}

export async function run() {
    try {
        let users = (await dbInstance.query("SELECT * FROM Users WHERE isEmailSent=0")).recordset as User[]
        // console.log(users);

        users.forEach(user => {
            ejs.renderFile("Templates/register.ejs", { name: user.name }, async (err, data) => {
                let messageOption = {
                    to: user.email,
                    from: process.env.Email,
                    subject: "H-Tours and Travels",
                    html: data
                }
                await sendEmail(messageOption)

                dbInstance.query(`UPDATE Users SET isEmailSent=1 WHERE id='${user.id}'`)
                console.log(users)
            })
        })
    } catch (error) {

    }
}

