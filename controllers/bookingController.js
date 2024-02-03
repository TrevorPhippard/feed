//controllers.js
const Booking = require('../models/bookingModel');

// for creating a new booking
// Controller for creating a new booking
exports.createBooking = async (req, res) => {
  try {
    const { id, username, role } = req.body;
    const booking = await Booking.create({ id, username, role });
    res.json({ message: 'Booking created successfully', booking });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// getting all Bookings
exports.getAllBookings = async (req, res) => {
    try {
      const bookings = await Booking.findAll();
      res.json(bookings);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };


  // Controller for getting a booking by ID
exports.getBookingById = async (req, res) => {
    try {
      const bookingId = req.params.id;
      const booking = await Booking.findByPk(bookingId);
      if (!booking) {
        res.status(404).send('booking not found');
      } else {
        res.json(booking);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

  
  // updating a booking
exports.updateBookingById = async (req, res) => {
    try {
      const bookingId = req.params.id;
      const { id, username, role } = req.body;
      const booking = await Booking.findByPk(bookingId);
      if (!booking) {
        res.status(404).send('Booking not found');
      } else {
        
        booking.id = id,
        booking.username = username,
        booking.role = role,


        await booking.save();
        res.json({ message: 'booking updated successfully', booking });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  // deleting a user by ID
  exports.deleteBookingById = async (req, res) => {
    try {
      const bookingId = req.params.id;
      const booking = await Booking.findByPk(bookingId);
      if (!booking) {
        res.status(404).send('booking not found');
      } else {
        await booking.destroy();
        res.send('booking deleted successfully');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };