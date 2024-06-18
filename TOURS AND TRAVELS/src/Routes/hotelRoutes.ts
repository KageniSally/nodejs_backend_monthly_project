import { Router } from "express";
import { verifyAdmin, verifyUser } from "../Middleware";
import { addHotel, deleteHotel, getHotelById, getHotels, updateHotel } from "../Controller/hotelController";

const hotelRoutes=Router()

hotelRoutes.post('',verifyAdmin,addHotel)
hotelRoutes.get('',verifyUser,getHotels)
hotelRoutes.get('/:id',verifyAdmin,getHotelById)
hotelRoutes.put('/:id',verifyAdmin,updateHotel)
hotelRoutes.delete('/:id',verifyAdmin,deleteHotel)

export default hotelRoutes
