import { Router } from "express";
import { registerUser,loginUser } from "../Controller/authController";

const authRouter = Router()
console.log("routes")
authRouter.post('/register', registerUser)
authRouter.post('/login',loginUser)


export default authRouter