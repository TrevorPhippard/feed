


import  socketController  from '../controllers/socketController';

  
var socketIO = function (io: any, socket: any, onlineUsers: any[]) {

  var socketCntr =  socketController(io, socket, onlineUsers)

  // connect to server
  // console.log('a user connected', socket.id);
  socket.on('connectToServer', socketCntr.onConnectToServer);
  /** @ts-ignore */
  socket.on('message', socketCntr.onMessage);
  socket.on('join', socketCntr.onUser)
  socket.on('leave', socketCntr.onLeave);
  socket.on('disconnect', socketCntr.onDisconnect)
  socket.on('enteredRoom', socketCntr.onEnteredRoom)
}

export default socketIO;