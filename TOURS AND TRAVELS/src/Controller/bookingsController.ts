import { Request, Response } from "express"
import { DBHelper } from "../DBHelpers"
import { Bookings } from '../Models/bookingModel'
import { v4 as uid } from 'uuid'



const dbInstance = new DBHelper
export async function addBooking(req: Request, res: Response) {
    try {
        //id
        const id = uid()

        //other
        const { user_id, tour_id, hotel_id, date, isEmailSent } = req.body
        dbInstance.execute('addBooking', {
            id, user_id, tour_id, hotel_id, date, isEmailSent
        })
        return res.status(201).json({ message: 'Booking created successfully' })
    } catch (error) {
        return res.status(500).json(error)
    }
}


export async function getBookings(req: Request, res: Response) {
    try {
        const bookings = (await dbInstance.execute('getBookings', {})).recordset as Bookings[]

        return res.status(200).json(bookings)
    } catch (error) {
        return res.status(500).json(error)
    }
}


export async function getBooking(req: Request<{ id: string }>, res: Response) {
    try {
        const booking = (await dbInstance.execute('getBooking', { id: req.params.id })).recordset as Bookings[]
        return res.status(200).json(booking)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export async function updateBooking(req: Request, res: Response) {
    try {
        const booking = (await dbInstance.execute('getBooking', { id: req.params.id })).recordset[0] as Bookings

        if (booking && booking.id) {
            const { tour_id, hotel_id, date } = req.body


            dbInstance.execute('updateBooking', {
                id: req.params.id,
                tour_id,
                hotel_id,
                date
            })

            return res.status(200).json({ message: "Booking Updated Successfully" })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

export async function deleteBooking(req: Request<{ id: string }>, res: Response) {
    try {
        const booking = (await dbInstance.execute('getBooking', { id: req.params.id })).recordset[0] as Bookings

        if (booking && booking.id) {
            await dbInstance.execute('deleteBooking', { id: req.params.id })
            return res.status(200).json({ message: "Booking Deleted Successfully" })
        }

        return res.status(404).json({ message: "Booking Not Found" })


    } catch (error) {
        return res.status(500).json(error)
    }
}