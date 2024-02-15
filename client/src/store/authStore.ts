import { defineStore } from 'pinia';
import AuthService from '../services/auth.service'
import SocketioService from '../services/socketio.service';

declare global {

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

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: import.meta.env.VITE_TOKEN,
    socketEndpoint: import.meta.env.VITE_SOCKET_ENDPOINT,
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
  }),

  actions: {
    setUser(cookieData: any) {
      this.user = JSON.parse(cookieData).data;
      this.token = this.user.token;
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
    getProfileInfo: state => state.profileInfo,
  }
})