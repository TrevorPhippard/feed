import axios from 'axios';

class EditorService {
  endpoint: string;

  constructor() {
    this.endpoint = import.meta.env.VITE_API_ENDPOINT + '/api/editor';
  }

  fetchTrivia() {
    return axios.get(this.endpoint)
      .then(response => {
        return response.data;
      });
  }

  fetchTriviaById(triviaId: number) {
    return axios.get(this.endpoint + `:${triviaId}`)
      .then(response => {
        return response.data;
      });
  }

  postTrivia(data:any) {
    return axios.post(this.endpoint,data )
      .then(response => {
        return response.data;
      });
  }
}

export default new EditorService();