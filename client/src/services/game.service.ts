import axios from "axios";
const endpoint = import.meta.env.VITE_API_ENDPOINT + "trivia";
// const headers = { "content-type": "application/json" }
// import SocketioService from "./socketio.service.js";

const GameService = {
  launchGame: ( room: string) => {

    return axios.get(endpoint + `/${room}`)
      .then(response => {
        return response.data;
      });
  },
  quitGame:()=>{


  }
}

export default GameService;