import express, { json } from "express"
import authRouter from "./Routes/authRoutes"
import userRoutes from "./Routes/userRoutes"
import tourRoutes from "./Routes/tourRoutes"

const app = express()

//Middleware
app.use(json())

//Routes
app.use('/users', authRouter)
app.use('/users', userRoutes)
app.use('/tours', tourRoutes)

console.log("server")
//Port
app.listen(5000, () => {
    console.log("server running...........")
})