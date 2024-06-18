import { Request, Response } from "express"
import { DBHelper } from "../DBHelpers"
import { Hotel } from '../Models/hotelModel'
import { v4 as uid } from 'uuid'



const dbInstance = new DBHelper
export async function addHotel(req: Request, res: Response) {
    try {
        //id
        const id = uid()

        //other
        const { name, location, starRating } = req.body
        dbInstance.execute('addHotel', {
            id, name, location, starRating
        })
        return res.status(201).json({ message: 'Hotel created successfully' })
    } catch (error) {
        return res.status(500).json(error)
    }
}


export async function getHotels(req: Request, res: Response) {
    try {
        const hotels = (await dbInstance.execute('getHotels', {})).recordset as Hotel[]

        return res.status(200).json(hotels)
    } catch (error) {
        return res.status(500).json(error)
    }
}


export async function getHotelById(req: Request<{ id: string }>, res: Response) {
    try {
        const hotel = (await dbInstance.execute('getHotel', { id: req.params.id })).recordset as Hotel[]
        return res.status(200).json(hotel)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export async function updateHotel(req: Request, res: Response) {
    try {
        const hotel = (await dbInstance.execute('getHotel', { id: req.params.id })).recordset[0] as Hotel

        if (hotel && hotel.id) {
            const { name, location, starRating } = req.body


            dbInstance.execute('updateHotel', {
                id: req.params.id,
                name,
                location,
                starRating
            })

            return res.status(200).json({ message: "Hotel Updated Successfully" })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

export async function deleteHotel(req: Request<{ id: string }>, res: Response) {
    try {
        const hotel = (await dbInstance.execute('getHotel', { id: req.params.id })).recordset[0] as Hotel

        if (hotel && hotel.id) {
            await dbInstance.execute('deleteHotel', { id: req.params.id })
            return res.status(200).json({ message: "Hotel Deleted Successfully" })
        }

        return res.status(404).json({ message: "Hotel Not Found" })


    } catch (error) {
        return res.status(500).json(error)
    }
}