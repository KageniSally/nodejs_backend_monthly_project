import { Router } from "express";
import { addTour, deleteTour, getTourById, getTours, updateTour } from "../Controller/tourController";
import { verifyAdmin, verifyUser } from "../Middleware";

const tourRoutes = Router()
tourRoutes.get('', verifyUser, getTours)
tourRoutes.post('',verifyAdmin,addTour)
tourRoutes.get('/:id', verifyAdmin, getTourById)
tourRoutes.delete('/:id', verifyAdmin, deleteTour)
tourRoutes.put('/:id', verifyAdmin, updateTour)

export default tourRoutes