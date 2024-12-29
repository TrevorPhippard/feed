import { io } from 'socket.io-client';

interface noArg {(): void};


class SocketioService {

  //@ts
  socket: any;

  constructor() { }

  setupSocketConnection(token: string, room: string, username: string) {
    console.log(import.meta.env.VITE_SOCKET_ENDPOINT)
    this.socket = io(import.meta.env.VITE_SOCKET_ENDPOINT, {
      auth: { token },
      withCredentials: true,
      extraHeaders: {
        "socket-header": "abcd"
      }
    });
    console.log(`Connecting socket...`, username);

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

  subscribeToMessages(cb: (err: null, data: any) => any) {
    if (!this.socket) return (true);
    this.socket.on('message', (msg: any) => cb(null, msg));
    this.socket.on('receivedMsg', (msg: any) => cb(null, msg));
  }

  subscribeToUsersPassage(cb: (err: null, data: any) => any) {
    this.socket.on('join', (msg: string) => cb(null, msg));
    this.socket.on('enteredRoom', (msg: string) => cb(null, msg));
    this.socket.on('disconnected', (msg: string) => cb(null, msg));
  }

  sendMessage(message: string, cb:noArg) {
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