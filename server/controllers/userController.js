import User from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// for creating a new user
export const registerUser = async (username, email, password) => {
  //Search for an existing user with the supplied email - to make sure same email is only used once
  const emailExists = await User.findOne({ where: { email: email } });
  if (emailExists)
    return {
      status: 400,
      message: "A User account with this email already exists",
    };

  //Hash the password with bcrypt and a generated salt.
  //  const salt = await bcrypt.genSalt(10);
  const salt = process.env.SALT;
  const hashedPassword = await bcrypt.hash(password, salt);

  return User.create({
    username: username,
    email: email,
    password: hashedPassword,
  })
    .then((savedUser) => {
      return { status: 200, message: savedUser.id };
    })
    .catch((err) => {
      return { status: 500, message: err.message };
    });
};

// Controller for creating a new user
export const signInUser = async (email, password) => {
  //Check if the email address exists in database. If not, reject the login
  const user = await User.findOne({ where: { email: email } });
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!user) return { status: 400, message: "Email is not correct" };

  //Check if pasword is correct using bcrpyt to compare to the stored hash. If they don"t match, reject the login
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return { status: 400, message: "Invalid password" };

  //Create + Assign a JWT token with a 10 minute expiry
  const token = jwt.sign(
    {
      id: user.id,
      exp: Math.floor(Date.now() / 1000) + 60 * 10,
    },
    JWT_SECRET
  );

  //Return the token in a header called "auth-token". Add auth-token to any future requests to protected routes
  return {
    user_name: user.username,
    token: token,
  };
};

// getting all users
export const getAllUsers = async () => {
  return await User.findAll()
    .then((user) => {
      return { status: 200, message: user };
    })
    .catch((err) => {
      return { status: 500, message: err.message };
    });
};

// Controller for getting a user by ID
export const getUserById = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    return { status: 404, message: "user not found" };
  } else {
    return { status: 200, user };
  }
};

// updating a user
export const updateUserById = async (userId, id, username, role) => {
  const user = await User.findByPk(userId);
  if (!user) {
    return { status: 404, message: "User not found" };
  } else {
      user.id = id;
      user.username = username;
      user.role = role;
      await user.save();
    return { status: 200, message: "user updated successfully", user };
  }
};

// deleting a user by ID
export const deleteUserById = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    return { status: 404, message: "user not found" };
  } else {
    await user.destroy();
    return { status: 200, message: "user deleted  successfully" };
  }
};