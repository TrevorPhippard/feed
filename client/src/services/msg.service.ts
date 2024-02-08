import axios from 'axios';

class msgService {
    endpoint: string;
  
    constructor(){
      this.endpoint = import.meta.env.VITE_API_ENDPOINT+'/api/messages:';
    }

    fetchMessages(roomId: string) {
      return axios.get(this.endpoint+`${roomId}`)
        .then(response => {
          return response.data;
        });
    }

    postMessages() {
      return axios.post(this.endpoint)
        .then(response => {
          return response.data;
        });
    }
}

export default new msgService();