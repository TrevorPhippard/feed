import axios from "axios";
const endpoint = import.meta.env.VITE_API_ENDPOINT + "game";
// const headers = { "content-type": "application/json" }

const GameService = {
  fetchAndLaunchGame: (room_id: string) => {
    return axios.get(endpoint + `/${room_id}`)
      .then(response => {
        return response.data;
      });
  }
}

export default GameService;