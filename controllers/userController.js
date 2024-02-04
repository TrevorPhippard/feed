
import User from '../models/user';

// for creating a new user
// Controller for creating a new user
export const createUser = async (req, res) => {
  try {
    const { id, username, role } = req.body;
    const user = await User.create({ id, username, role });
    res.json({ message: 'User created successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// getting all users
export const getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };


  // Controller for getting a user by ID
export const getUserById = async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findByPk(userId);
      if (!user) {
        res.status(404).send('User not found');
      } else {
        res.json(user);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

  
  // updating a user
export const updateUserById = async (req, res) => {
    try {
      const userId = req.params.id;
      const { id, username, role } = req.body;
      const user = await User.findByPk(userId);
      if (!user) {
        res.status(404).send('User not found');
      } else {
        
        user.id = id,
        user.username = username,
        user.role = role,

        await user.save();
        res.json({ message: 'user updated successfully', user });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  // deleting a user by ID
  export const deleteUserById = async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await User.findByPk(userId);
      if (!user) {
        res.status(404).send('User not found');
      } else {
        await user.destroy();
        res.send('user deleted successfully');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };