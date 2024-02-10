import { defineStore } from 'pinia';
import AuthService from '../services/auth.service'
import SocketioService from '../services/socketio.service.js';
import UploadService from "../services/upload.service.js";

declare global {
  // interface Window { }

  interface importMetaEnv {
    readonly TOKEN: string
  }

  interface importMeta {
    readonly env: importMetaEnv
  }
}


interface User {
  email: string,
  password: string
  username?: string
}

export const useStore = defineStore('main', {
  state: () => ({
    token: import.meta.env.VITE_TOKEN,
    socketEndpoint: import.meta.env.VITE_SOCKET_ENDPOINT,
    roomId: 'myRandomChatRoomId',
    loggedIn: false,
    user: {
      user_name: '',
      token: ''
    },
    profileInfo: {
      avatar: '',
      email: '',
      Id: 0,
      memberSince: '',
    },
    gameData: {
      gameName:'quizathon'
    },
    editorData: {
      gameName: 'quizathon',
      triviaData: [{
        name: 'slide 1',
        type: 'checkbox',
        question: 'Q1:  Whose that wonderful girl, could she be any sweeter?',
        options: [
          { choice: 'Nanalan', correct: false },
          { choice: 'Sweet Pea', correct: true },
          { choice: 'Mona', correct: false },
          { choice: 'Russer', correct: false },
          { choice: 'mr.woca', correct: false }
        ],
        bgImg: import.meta.env.VITE_SOCKET_ENDPOINT + "img-0906.jpg"
      }, {
        name: 'slide 2',
        type: 'checkbox',
        question: 'Q2:  what will we do with feefer?',
        options: [
          { choice: 'Put in water', correct: false },
          { choice: 'ask Russer', correct: false },
          { choice: 'NANA!!!!', correct: true },
          { choice: 'mr.woca?', correct: false }
        ],
        bgImg: import.meta.env.VITE_SOCKET_ENDPOINT + "img-0905.jpg"
      }],
    }
  }),

  actions: {
    setUser(cookieData: any) {
      this.user = JSON.parse(cookieData).data;
      this.token = this.user.token;
    },
    upload(data: any) {
      UploadService.upload(data);
    },
    login(user: User | null) {
      return AuthService.login(user).then(
        (user: any) => {
          console.log('response user::', user)

          this.user = user;
          this.loggedIn = true;
          localStorage.setItem("user", JSON.stringify({ data: this.user }));
          SocketioService.setupSocketConnection(this.user.token);

          return Promise.resolve(user);
        },
        (error: any) => {
          this.loggedIn = false;
          // @ts-ignore
          this.user = null;
          return Promise.reject(error);
        }
      )
    },
    register(user: User | null) {
      return AuthService.register(user).then(
        (user: any) => {
          this.user = user;
          this.loggedIn = true;

          console.log('log in successful')

          localStorage.setItem("user", JSON.stringify({ data: this.user }));
          SocketioService.setupSocketConnection(this.user.token);

          return Promise.resolve(user);

        },
        (error: any) => {
          this.loggedIn = false;
          // @ts-ignore
          this.user = null;
          return Promise.reject(error);
        })
    }

  },
  getters: {
    getusername: state => state.user.user_name,
    getToken: state => state.user.token,
    getEndPoint: state => state.socketEndpoint,
    getRoom: state => state.roomId,
    getProfileInfo: state => state.profileInfo,
    gameData: state => state.gameData,
    editorData: state => state.editorData
  }
})