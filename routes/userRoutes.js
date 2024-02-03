const express = require("express");
const { createUser, getAllUsers, getUserById, updateUserById, deleteUserById} = require("../controllers/userController");

const router = express.Router();

router.route("/users")
    // Create a new User
    .get(getAllUsers)
    // Get all Users
    .post(createUser);
router.route("/users/:id")
    // Get a User by ID
    .get(getUserById)
    // Update a User by ID
    .put(updateUserById)
    // Delete a User by ID
    .delete(deleteUserById)
// Export the router
module.exports = router;