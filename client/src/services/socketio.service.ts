// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { io } from 'socket.io-client';

interface noArg {(): void}

interface messageType{
  roomId: string;
  displayName: string;
  msg: string;
}

interface userPassageType{
  displayName: string;
  type: string;
}
class SocketioService {

  socket: unknown;

  constructor() { }
 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
 //@ts-expect-error
  setupSocketConnection(token: string, room: string, username: string) {
    console.log('::',import.meta.env.VITE_SOCKET_ENDPOINT)
    this.socket = io(import.meta.env.VITE_SOCKET_ENDPOINT, {
      auth: { token },
      withCredentials: true,
      extraHeaders: {
        "socket-header": "abcd"
      }
    });

    console.log(this.socket)
    console.log(`Connecting socket...`, username, room);

    if (room) {
      this.socket.emit('join', { roomId: room, userId: username, socketId: this.socket.id });
    }
  }

  joinRoom(room: string, username: string) {
    console.log('join', room)
    // leave old room
    // if (currentRoomId) {
    //     this.socket.emit('leave', { roomId: currentRoomId, userId: userInfo.id, socketId: this.socket.id });
    // }
    // load old messages in new room
    // join new room
    this.socket.emit('join', { roomId: room, userId: username, socketId: this.socket.id });

  }

  subscribeToMessages(cb: (err: null, msg: string) => void) {
    if (!this.socket) return (true);
    this.socket.on('message', (msg: string) => cb(null, msg));
    this.socket.on('receivedMsg', (msg: string) => cb(null, msg));
  }

  subscribeToUsersPassage(cb: (err: null, userPassage: userPassageType) => void) {
    this.socket.on('join', (msg: string) => cb(null, { displayName: msg, type: 'join' }));
    this.socket.on('enteredRoom', (msg: string) => cb(null, { userList: msg, type: 'enteredRoom' }));
    this.socket.on('disconnected', (msg: string) => cb(null, { displayName: msg, type: 'disconnected' }));
  }



  sendMessage(message: messageType, cb:noArg) {
    if (this.socket) {
      this.socket.emit('message', { message }, cb);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketioService();