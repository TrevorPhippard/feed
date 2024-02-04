import express  from "express";
import { createUser, getAllUsers, getUserById, updateUserById, deleteUserById} from "../controllers/userController";

const router = express.Router();

router.route("/users")
    .get(getAllUsers)
    .post(createUser);

router.route("/users/:id")
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById)

export default router;