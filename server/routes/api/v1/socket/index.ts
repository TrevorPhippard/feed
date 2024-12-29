

import socketController from "../../../../controllers/socketController";
import { Socket } from "socket.io";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const socketRoutes = function (io: any, socket: Socket ) {
  const socketCntr = socketController(io, socket)

    // connect to server
    // console.log("a user connected", socket.id);
    socket.on("connectToServer", socketCntr.onConnectToServer);
    socket.on("message", socketCntr.onMessage);
    socket.on("join", socketCntr.onUser)
    socket.on("leave", socketCntr.onLeave);
    socket.on("disconnect", socketCntr.onDisconnect)
    socket.on("enteredRoom", socketCntr.onEnteredRoom)
}

export default socketRoutes;