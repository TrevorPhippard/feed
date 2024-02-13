import axios from 'axios';

class GameService {
  endpoint: string;

  constructor() {
    this.endpoint = import.meta.env.VITE_API_ENDPOINT + '/api/game';
  }

  fetchAndLaunchGame(roomId: string) {
    return axios.get(this.endpoint + `:${roomId}`)
      .then(response => {
        return response.data;
      });
  }

}

export default new GameService();