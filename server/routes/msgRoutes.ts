import express  from "express";
import {  addMsgToRoom, getAllMessages, getMessageById, updateMessageById, removeMsgByRoom } from "../controllers/messageController";

const router = express.Router();

      // request previous messages
  router.route('/messages:roomId').get(getMessageById)
                                    .post(updateMessageById)
                                    .delete(removeMsgByRoom);

  router.route('/messages').get(getAllMessages)
                                .post(addMsgToRoom);

export default router;