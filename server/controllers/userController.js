
import User from '../models/user.model';

const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

// for creating a new user
// Controller for creating a new user
export const registerUser = async (req, res) => {

  try {
    //Search for an existing user with the supplied email - to make sure same email is only used once
    const emailExists = await User.findOne({ where: { "email": req.body.email } });
    if (emailExists) return res.status(400).send("A User account with this email already exists");

    //Hash the password with bcrypt and a generated salt.
    //  const salt = await bcrypt.genSalt(10);
    const salt = process.env.SALT
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Build the user object to write to database
    const newUser = {
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    }

    //Save the new user object, using the User model we defined in Sequelize. Return the new user ID in JSON
    User.create(newUser)
      .then(savedUser => {
        res.status(200).json({ status: "Success", new_user_id: savedUser.id });
      })
      .catch(err => res.status(500).send(err.message));

  } catch (err) {
    return res.status(500).send('Registration error');
  }
}

// Controller for creating a new user
export const signInUser = async (req, res) => {
  try {
    //Check if the email address exists in database. If not, reject the login
    const user = await User.findOne({ where: { "email": req.body.email } });
    if (!user) return res.status(400).send("Email is not correct");

    //Check if pasword is correct using bcrpyt to compare to the stored hash. If they don't match, reject the login
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send("Invalid password");

    //Create + Assign a JWT token with a 10 minute expiry
    const token = jwt.sign({
      id: user.id,
      exp: Math.floor(Date.now() / 1000) + (60 * 10)
    }, process.env.JWT_SECRET);

    //Return the token in a header called 'auth-token'. Add auth-token to any future requests to protected routes
    res.header("auth-token", token).send({
      user_name: user.username,
      token: token
    });
  } catch (err) {
    return res.status(500).send('Sign in error');
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