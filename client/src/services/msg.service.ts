import axios from 'axios';
var endpoint = import.meta.env.VITE_API_ENDPOINT + '/api/messages';
const headers = { "content-type":"application/json"}

const msgService = {

  fetchMessages :(roomId: string) =>{
    return axios.get(endpoint + `:${roomId}`)
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