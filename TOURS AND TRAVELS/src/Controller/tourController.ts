import { Request, Response, response } from "express"
import { DBHelper } from "../DBHelpers"
import { Tour } from '../Models/toursModel'
import { v4 as uid } from 'uuid'



const dbInstance = new DBHelper
export async function addTour(req: Request, res: Response) {
    try {
        //id
        const id = uid()

        //other
        const { name, description, destination, price } = req.body
        dbInstance.execute('addTour', {
            id, name, description, destination, price
        })
        return res.status(201).json({ message: 'Tour created successfully' })
    } catch (error) {
        return res.status(500).json(error)
    }
}


export async function getTours(req: Request, res: Response) {
    try {
        const tours = (await dbInstance.execute('getTours', {})).recordset as Tour[]

        return res.status(200).json(tours)
    } catch (error) {
        return res.status(500).json(error)
    }
}


export async function getTourById(req: Request<{ id: string }>, res: Response) {
    try {
        const tour = (await dbInstance.execute('getTourId', { id: req.params.id })).recordset as Tour[]
        return res.status(200).json(tour)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export async function updateTour(req: Request, res: Response) {
    try {
        const tour = (await dbInstance.execute('getTourId', { id: req.params.id })).recordset[0] as Tour

        if (tour && tour.id) {
            const { name, description, destination, price } = req.body


            dbInstance.execute('updateTour', {
                id: req.params.id,
                name,
                description,
                destination,
                price
            })

            return res.status(200).json({ message: "Tour Updated Successfully" })
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}

export async function deleteTour(req:Request<{id:string}>,res:Response){
    try {
        dbInstance.execute('deleteTour',{id:req.params.id})
    return res.status(200).json({message:"Tour Deleted Successfully"})
    } catch (error) {
        return res.status(500).json(error)
    }
}