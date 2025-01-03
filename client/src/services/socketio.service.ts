// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { io } from 'socket.io-client';

interface noArg {(): void}

interface messageType{
  room_id: string;
  username: string;
  message_body: string;
}

interface userPassageType{
  username: string;
  type: string;
  data?: {
    userId: string,
    room_id:string
  };
  userList?: string;
}
class SocketioService {

  socket: unknown;

  constructor() { }
 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
 //@ts-expect-error
  setupSocketConnection(token: string, room: string, username: string) {
    this.socket = io(import.meta.env.VITE_SOCKET_ENDPOINT, {
      auth: { token },
      withCredentials: true,
      extraHeaders: {
        "socket-header": "abcd"
      }
    });


    console.log(`Connecting socket...`, {username, room});

    if (room) {
      this.socket.emit('join', { room_id: room, userId: username, socketId: this.socket.id });
    }
  }

  joinRoom(room: string, username: string) {
    console.log('join', room)
    // leave old room
    // if (currentroom_id) {
    //     this.socket.emit('leave', { room_id: currentroom_id, userId: userInfo.id, socketId: this.socket.id });
    // }
    // load old messages in new room
    // join new room
    this.socket.emit('join', { room_id: room, userId: username, socketId: this.socket.id });
  }

  invite(username: string, room: string){
    this.socket.emit('invite',{userId: username, room_id: room})
  }

  subscribeToMessages(cb: (err: null, message: string) => void) {
    if (!this.socket) return (true);
    this.socket.on('message', (msg: string) => cb(null, msg));
    this.socket.on('receivedMsg', (msg: string) => cb(null, msg));
  }

  subscribeToUsersPassage(cb: (err: null, userPassage: userPassageType) => void) {
    this.socket.on('join', (msg: string) => cb(null, { username: msg, type: 'join' }));
    this.socket.on('enteredRoom', (msg: string) => cb(null, { userList: msg, type: 'enteredRoom' }));
    this.socket.on('disconnected', (msg: string) => cb(null, { username: msg, type: 'disconnected' }));
    this.socket.on('broadcast',  (msg: string) => cb(null, { data: msg, type: 'broadcast' }));
  }

  sendMessage(message: messageType, cb:noArg) {
    if (this.socket) {
      this.socket.emit('message',message, cb);
    }
  }

  subscribeToGameActions(cb: (err: null, message: string) => void) {
    if (!this.socket) return (true);
    this.socket.on('join', (msg: string) => cb(null, { username: msg, type: 'join' }));
    this.socket.on('enteredRoom', (msg: string) => cb(null, { userList: msg, type: 'enteredRoom' }));
    this.socket.on('disconnected', (msg: string) => cb(null, { username: msg, type: 'disconnected' }));
    this.socket.on('message', (msg: string) => cb(null, msg));
    this.socket.on('receivedMsg', (msg: string) => cb(null, msg));
    this.socket.on('broadcast',  (msg: string) => cb(null, { data: msg, type: 'broadcast' }));
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

export default new SocketioService();