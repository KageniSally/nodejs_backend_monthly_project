import { Router } from "express";
import { deleteUser, getUserById, getUsers, updateUser } from "../Controller/usersController";
import { verifyAdmin } from "../Middleware";
import { log } from "console";



const userRoutes = Router()

//Get all users, by admin
userRoutes.get('', verifyAdmin, getUsers)

//Only admins can delete
userRoutes.delete('/:id', verifyAdmin, deleteUser)

//update a user but not by admin
userRoutes.put('/:id', updateUser)

//get user by id
userRoutes.get('/:id', getUserById)


export default userRoutes