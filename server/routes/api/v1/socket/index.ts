

import SocketController from "../../../../controllers/socketController";
import { Socket } from "socket.io";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const socketRoutes =  function (io: any, socket: Socket ) {

  const socketCntr =   SocketController(io, socket);

    socket.on("connectToServer", socketCntr.onConnectToServer);
    socket.on("message", socketCntr.onMessage);
    socket.on("join", socketCntr.onUser)
    socket.on("leave", socketCntr.onLeave);
    socket.on("disconnect", socketCntr.onDisconnect)
    socket.on("enteredRoom", socketCntr.onEnteredRoom)
    socket.on("invite", socketCntr.onInvite)
}

export default socketRoutes;