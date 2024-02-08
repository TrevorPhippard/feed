import express  from "express";
import { registerUser, signInUser, getAllUsers, getUserById, updateUserById, deleteUserById} from "../controllers/userController";

const router = express.Router();

router.route("/users")
    .get(getAllUsers)

router.route("/users/:id")
    .get(getUserById)
    .put(updateUserById)
    .delete(deleteUserById)
    .post(signInUser);

router.post('/auth/signup', registerUser);
router.post('/auth/signin', signInUser);

export default router;