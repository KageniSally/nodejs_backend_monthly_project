import { Request, Response } from "express"
import { DBHelper } from "../DBHelpers"
import { User } from "../Models/usersModel"
import Bcrypt from 'bcrypt'

const dbInstance = new DBHelper
export async function getUsers(req: Request, res: Response) {
    try {
        const users = (await dbInstance.execute('getUsers', {})).recordset as User[]
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json(error)
    }
}

export async function updateUser(req: Request<{ id: string }>, res: Response) {
    try {
        const user = (await dbInstance.execute('getUserId', { id: req.params.id })).recordset[0] as User


        if (user && user.id) {
            const { name, email, password } = req.body

            //if no error proceed to hash the password hashing
            const hashedPass = await Bcrypt.hash(password, 10)



            dbInstance.execute('updateUser', {
                id: req.params.id,
                name,
                email,
                password: hashedPass
            })

            return res.status(200).json({ message: "User Updated Successfully" })
        }

    } catch (error) {
        return res.status(500).json(error)
    }
}


export async function deleteUser(req: Request<{ id: string }>, res: Response) {
    try {
        console.log('here')
        await dbInstance.execute('deleteUser', { id: req.params.id })

        return res.status(200).json({ message: "User Deleted Successfully" })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export async function getUserById(req: Request<{ id: string }>, res: Response) {
    try {
        const user = (await dbInstance.execute('getUserId', { id: req.params.id })).recordset as User[]
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json(500)
    }
}