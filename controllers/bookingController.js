import Booking from '../models/booking';

// for creating a new booking
// Controller for creating a new booking
export const createBooking = async (req, res) => {
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
export const getAllBookings = async (req, res) => {
    try {
      const bookings = await Booking.findAll();
      res.json(bookings);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };


  // Controller for getting a booking by ID
export const getBookingById = async (req, res) => {
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
export const updateBookingById = async (req, res) => {
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
  export const deleteBookingById = async (req, res) => {
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