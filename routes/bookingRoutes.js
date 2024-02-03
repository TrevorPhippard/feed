const express = require("express");
const { createBooking, getAllBookings, getBookingById, updateBookingById, deleteBookingById} = require("../controllers/bookingController");

const router = express.Router();

router.route("/bookings")
    // Create a new Booking
    .get(getAllBookings)
    // Get all Bookings
    .post(createBooking);
router.route("/bookings/:id")
    // Get a Booking by ID
    .get(getBookingById)
    // Update a Booking by ID
    .put(updateBookingById)
    // Delete a Booking by ID
    .delete(deleteBookingById)
// Export the router
module.exports = router;