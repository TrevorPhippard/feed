import axios from 'axios';
const endpoint = import.meta.env.VITE_API_ENDPOINT + '/api/game';
const headers = { "content-type": "application/json" }

const GameService = {
  fetchAndLaunchGame: (roomId: string) => {
    return axios.get(endpoint + `:${roomId}`)
      .then(response => {
        return response.data;
      });
  }
}

export default GameService;