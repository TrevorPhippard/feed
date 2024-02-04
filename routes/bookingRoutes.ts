import express  from "express";
import { createBooking, getAllBookings, getBookingById, updateBookingById, deleteBookingById} from "../controllers/bookingController";

const router = express.Router();

router.route("/bookings")
    .get(getAllBookings)
    .post(createBooking);

router.route("/bookings/:id")
    .get(getBookingById)
    .put(updateBookingById)
    .delete(deleteBookingById);

export default router;