import axios from 'axios';

class EditorService {
  endpoint: string;

  constructor() {
    this.endpoint = import.meta.env.VITE_API_ENDPOINT + '/api/editor';
  }

  fetchTrivia() {
    return axios.get(this.endpoint)
    .then(response =>  response.data)
    .catch(error=> error.toJSON());
  }

  fetchTriviaById(triviaId: number) {
    return axios.get(this.endpoint + `:${triviaId}`)
    .then(response =>  response.data)
    .catch(error=> error.toJSON());
  }

  postTrivia(data:any) {
    return axios.post(this.endpoint,data )
    .then(response =>  response.data)
    .catch(error=> error.toJSON());

  }

  updateTrivia(data:any, index:number| boolean) {
    return  axios.put(this.endpoint+":"+index, data )
    .then(response =>  response.data)
    .catch(error=> error.toJSON());

  }

  deleteTrivia(data:any, index:number| boolean) {
    return  axios.delete(this.endpoint+":"+index, data )
    .then(response =>  response.data)
    .catch(error=> error.toJSON());
  }
}

export default new EditorService();