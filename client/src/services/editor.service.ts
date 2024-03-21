import axios from 'axios';
const endpoint = import.meta.env.VITE_API_ENDPOINT + '/api/editor';

const EditorService = {

  fetchTrivia:() =>{
    return axios.get(endpoint)
    .then(response =>  response.data)
    .catch(error=> error.toJSON());
  },

  fetchTriviaById:(triviaId: number) =>{
    return axios.get(endpoint + `:${triviaId}`)
    .then(response =>  response.data)
    .catch(error=> error.toJSON());
  },

  postTrivia:(data:any) =>{
    return axios.post(endpoint,data )
    .then(response =>  response.data)
    .catch(error=> error.toJSON());

  },

  updateTrivia:(data:any, index:number| boolean) =>{
    return  axios.put(endpoint+":"+index, data )
    .then(response =>  response.data)
    .catch(error=> error.toJSON());

  },

  deleteTrivia:(data:any, index:number| boolean) =>{
    return  axios.delete(endpoint+":"+index, data )
    .then(response =>  response.data)
    .catch(error=> error.toJSON());
  }
}

export default EditorService;