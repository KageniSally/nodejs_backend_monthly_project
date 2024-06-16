import { Response, Request } from 'express'
import { v4 as uid } from 'uuid'
import { ValidateRegistration } from '../Helpers'
import Bcrypt from 'bcrypt'
import { DBHelper } from '../DBHelpers'
import { Payload, User } from '../Models/usersModel'
import jwt from 'jsonwebtoken'


//Instance of the class
const dbInstance = new DBHelper

//Register Function
export async function registerUser(req: Request, res: Response) {
    try {
        //id
        const id = uid()
        //Request Body
        const { name, email, password } = req.body
        // console.log(req.body)

        const { error } = ValidateRegistration.validate(req.body)

        if (error) {
            return res.status(400).json(error.details[0].message)
        }
        //if no error proceed to hash the password hashing
        const hashedPass = await Bcrypt.hash(password, 10)

        //make a connection to database
        dbInstance.execute('addUser', { id, name, email, password: hashedPass })


        return res.status(201).json({ message: 'User created successfully' })
    } catch (error) {
        return res.status(500).json(error)
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body


        const user = (await dbInstance.execute('getUser', { email: email })).recordset as User[]



        if (user.length !== 0) {
            const isValid = await Bcrypt.compare(password, user[0].password)


            if (user[0].isDeleted === 1) {
                return res.status(400).json({ message: 'Account is deleted' });
            }

            if (isValid) {
                const payload: Payload = {
                    sub: user[0].id,
                    name: user[0].name,
                    role_id: user[0].role_id
                }
                const token = jwt.sign(payload, process.env.SECRET as string, { expiresIn: '2h' })


                return res.status(200).json({ message: 'Login sucessful!!!!!!!', token })
            }

        }
        return res.status(400).json({ message: 'Cannot Login' })
    } catch (error) {
        return res.status(500).json(error)
    }
}


