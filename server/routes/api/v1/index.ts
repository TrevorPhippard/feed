import express from "express";

import upload from "./upload";
import messages from "./messages";
import room from "./room";
import trivia from "./trivia";
import users from "./users";
import auth from "./auth";
import resources from "./resources";

// import socketIO from "./socket";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("/api/v1 is working!");
});


// router.use("/upload", (req, res) => {
//   res.send("therefore");
// });

router.use("/upload",upload);
router.use("/messages",messages);
router.use("/room",room);
router.use("/trivia",trivia);
router.use("/users",users);
router.use("/auth",auth);
router.use("/resources",resources);

// router.use("/socket",socketIO)

export default router;

