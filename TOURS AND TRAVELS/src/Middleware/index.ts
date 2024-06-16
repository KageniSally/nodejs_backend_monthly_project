import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Payload } from '../Models/usersModel';
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(__dirname, "../../.env") })


export interface ExtendedRequest1 extends Request {
    info?: Payload
}


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
