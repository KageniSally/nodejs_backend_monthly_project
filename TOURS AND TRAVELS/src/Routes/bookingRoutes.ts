import { Router } from "express";
import { addBooking, deleteBooking, getBooking, getBookings, updateBooking } from "../Controller/bookingsController";
import { checkPermissionBooking, verifyAdmin, verifyUser } from "../Middleware";
const bookingRoutes = Router()

bookingRoutes.post('', verifyUser, addBooking)
bookingRoutes.get('', verifyAdmin, getBookings)
bookingRoutes.get('/:id', checkPermissionBooking, getBooking)
bookingRoutes.put('/:id', checkPermissionBooking, updateBooking)
bookingRoutes.delete('/:id', checkPermissionBooking, deleteBooking)

export default bookingRoutes

