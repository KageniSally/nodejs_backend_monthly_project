import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Payload, User } from '../Models/usersModel';
import dotenv from 'dotenv'
import path from 'path'
import { DBHelper } from '../DBHelpers';
import { Bookings } from '../Models/bookingModel';
dotenv.config({ path: path.resolve(__dirname, "../../.env") })


export interface ExtendedRequest1 extends Request {
    info?: Payload
}



const dbInstance = new DBHelper
export function verifyAdmin(req: ExtendedRequest1, res: Response, next: NextFunction) {
    try {
        const token = req.headers['token'] as string
        if (!token) {
            return res.status(400).json({ message: ' No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.SECRET as string) as Payload;

        if (decoded.role_id !== 2) {
            console.log(decoded)
            return res.status(400).json({ message: ' Not an admin.' });
        }


        req.info = decoded;
        next();
    } catch (error) {
        return res.status(500).json(error);
    }
}


export function verifyUser(req: ExtendedRequest1, res: Response, next: NextFunction) {
    try {
        const token = req.headers['token'] as string
        if (!token) {
            return res.status(400).json({ message: ' No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.SECRET as string) as Payload;

        if (decoded.role_id !== 1) {
            console.log(decoded)
            return res.status(400).json({ message: ' Not a User.' });
        }


        req.info = decoded;
        next();
    } catch (error) {
        return res.status(500).json(error);
    }
}

export async function checkPermission(req: ExtendedRequest1, res: Response, next: NextFunction) {
    try {
        const token = req.headers['token'] as string

        if (!token) {
            return res.status(400).json({ message: ' No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.SECRET as string) as Payload;
        const user = (await dbInstance.execute('getUserId', { id: req.params.id })).recordset as User[]

        // if (user.length === 0) {
        //     return res.status(400).json({ message: "Not found" })
        // }
        if (decoded.role_id !== 2 || user[0].id !== decoded.sub) {
            // console.log(user[0].id)
            // console.log(decoded.sub)
            // console.log(decoded.role_id)
            // return res.status(400).json({ message: ' You do not have the required permissions' });
            next();
        } else {
            return res.status(400).json({ message: ' You do not have the required permissions' });

        }

        console.log(user[0].id)
        console.log(decoded)


        req.info = decoded;
        // next();
    } catch (error) {
        return res.status(500).json(error);
    }
}



export async function checkPermissionBooking(req: ExtendedRequest1, res: Response, next: NextFunction) {
    try {
        const token = req.headers['token'] as string

        if (!token) {
            return res.status(400).json({ message: ' No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.SECRET as string) as Payload;
        const userBooking = (await dbInstance.execute('getBooking', { id: req.params.id })).recordset as Bookings[]


        if (decoded.role_id === 2 || userBooking[0].user_id === decoded.sub) {
            next();
        } else {
            return res.status(400).json({ message: ' You do not have the required permissions' });

        }

        console.log(userBooking[0].id)
        console.log(decoded)


        req.info = decoded;
        // next();
    } catch (error) {
        return res.status(500).json(error);
    }
}
