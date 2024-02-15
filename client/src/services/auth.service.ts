import axios from 'axios';

interface User {
  email: string,
  password: string
  username?: string
}

class AuthService {
  endpoint: string;

  constructor() {
    this.endpoint = import.meta.env.VITE_API_ENDPOINT + '/api/auth/';
  }

  login(user: User | null) {
    return axios.post(this.endpoint + 'signin', user)
      .then(response => {
        return response.data;
      });
  }

  register(user: User | null) {
    return axios.post(this.endpoint + 'signup', user).then(response => {
      return response.data;
    });
  }
}

export default new AuthService();