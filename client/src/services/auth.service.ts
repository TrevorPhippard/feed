import axios from "axios";
const endpoint = import.meta.env.VITE_API_ENDPOINT + "auth/";
// const headers = { "content-type":"application/json"};

interface User {
  email: string,
  password: string
  username?: string
}

const AuthService = {
  login:  (user: User | null)=>{
    return axios.post(endpoint + "signin", user)
    .then(response => {
      return response.data;
    });

  },

  register:  (user: User | null)=>{
    return axios.post(endpoint + "signup", user).then(response => {
      return response.data;
    });
  }
}

export default AuthService;