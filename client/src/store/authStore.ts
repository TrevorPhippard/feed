import { defineStore } from "pinia";
import AuthService from "../services/auth.service"
import SocketioService from "../services/socketio.service";

declare global {

  interface importMetaEnv {
    readonly TOKEN: string
  }

  interface importMeta {
    readonly env: importMetaEnv
  }
}

interface User {
  email: string;
  password: string;
  username?: string;
}

interface UserType {
  token: string;
  user_name: string;
} 

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: import.meta.env.VITE_TOKEN,
    socketEndpoint: import.meta.env.VITE_SOCKET_ENDPOINT,
    loggedIn: false,
    user: {
      user_name: "Default",
      token: ""
    },
    profileInfo: {
      avatar: "",
      email: "",
      Id: 0,
      memberSince: "",
    },
  }),

  actions: {
    setUser(cookieData: any) {
      this.user = JSON.parse(cookieData).data;
      this.token = this.user.token;
    },
    login(user: User) {
      return AuthService.login(user).then(
        (userRes: UserType) => {

          this.user = userRes;
          this.loggedIn = true;
          localStorage.setItem("user", JSON.stringify({ data: this.user }));
          SocketioService.setupSocketConnection(this.user.token,"landing" ,userRes.user_name);

          return Promise.resolve(userRes);
        },
        (error: Error) => {
          this.loggedIn = false;
          this.user = {
            token:"",
            user_name:""
          };
          return Promise.reject(error);
        }
      )
    },
    register(user: User ) {
      return AuthService.register(user).then(
        (userRes: UserType) => {
          this.user = userRes;
          this.loggedIn = true;

          localStorage.setItem("user", JSON.stringify({ data: this.user }));
          SocketioService.setupSocketConnection(this.user.token,"landing" ,userRes.user_name);

          return Promise.resolve(userRes);
        },
        (error: Error) => {
          this.loggedIn = false;
          this.user = {
            token:"",
            user_name:""
          };
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