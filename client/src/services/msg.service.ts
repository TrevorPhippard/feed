import axios from "axios";
const endpoint = import.meta.env.VITE_API_ENDPOINT + "messages";
// const headers = { "content-type":"application/json"}

const msgService = {

  fetchMessages :(room_id: string) =>{
    return axios.get(endpoint + `/${room_id}`)
      .then(response => {
        return response.data;
      });
  },

  postMessages :()=> {
    return axios.post(endpoint)
      .then(response => {
        return response.data;
      });
  }
}

export default msgService;