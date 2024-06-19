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


export async function booking() {
    try {
        const bookings = (await dbInstance.query("SELECT *FROM Bookings WHERE isEmailSent=0")).recordset as Bookings[]

        bookings.forEach(async (booking) => {
            const userId = booking.id

            console.log(userId)

            const user = (await dbInstance.query(`SELECT * FROM Users WHERE id='${userId}'`)).recordset[0] as User
            console.log(user)
                let messageOption = {
                    to: user.email,
                    from: "gitongasally4@gmail.com",
                    subject: "Booking Successful",
                    html: `
                    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>H Tours and Travels - Welcome!</title>
        <style>
            /* Include your main email CSS styles here */
            body {
                font-family: sans-serif;
                margin: 0;
                padding: 0;
                
            }
    
            .container {
                max-width: 600px;
                width: 100%;
                margin: 0 auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 5px;
            }
    
            .header {
                text-align: center;
                padding: 20px 0;
                border-bottom: 1px solid #ddd;
                background-color: #5ec4f388;
            }
    
            .header h1 {
                font-size: 24px;
                margin: 0;
            }
    
            .content {
                padding: 20px 0;
            }
    
            .content p {
                line-height: 1.5;
            }
    
            .footer {
                text-align: center;
                padding: 20px 0;
                border-top: 1px solid #ddd;
                background-color: #5ec4f388;
            }
    
            .footer p {
                font-size: 12px;
                color: #aaa;
            }
        </style>
    </head>
    
    <body>
        <div class="container">
            <div class="header">
                <h1>H Store</h1>
            </div>
            <div class="content">
                <p>Hi '${user.name}',</p>
                <p>This is to inform tou that your Booking was successful</p>
                <ul>
                    <li>'${booking.hotel_id}'</li>
                    <li>'${booking.tour_id}'</li>
                    <li>'${booking.date}'</li>
                </ul>
                <p>To get started, explore our website at.</p>
                <p>Happy shopping!</p>
            </div>
            <div class="footer">
                <p>&copy; H Tours and Travels 2024</p>
            </div>
        </div>
    </body>
    
    </html>`
                }
                await sendEmail(messageOption)

                dbInstance.query(`UPDATE Bookings SET isEmailSent=1 WHERE id='${booking.id}'`)

            })

        }
        
    

    catch (error) {

    }
}


