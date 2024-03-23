import express from "express";
import { addRoom, getAllRooms, getRoomById, updateRoomById, removeroomByRoom } from "../controllers/roomController";

const router = express.Router();

// request previous messages
router.route('/rooms:id').get(getRoomById)
    .post(updateRoomById)
    .delete(removeroomByRoom);

router.route('/rooms').get(getAllRooms)
    .post(addRoom);

export default router;