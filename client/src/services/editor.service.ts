import axios from "axios";
const endpoint = import.meta.env.VITE_API_ENDPOINT + "trivia";


interface triviaData {
  gameName: string;
  user_id: string;
  slides: string;
}

const EditorService = {

  fetchTrivia:() =>{
    return axios.get(endpoint)
    .then(response =>  response.data)
    .catch(error=> error.toJSON());
  },

  fetchTriviaById:(triviaId: number) =>{
    return axios.get(endpoint + `/${triviaId}`)
    .then(response =>  response.data)
    .catch(error=> error.toJSON());
  },

  postTrivia:(data:triviaData) =>{
    console.log({
      gameName:data.gameName,
      slide: JSON.parse(data.slides),
    })
    return axios.post(endpoint,data )
    .then(response =>  response.data)
    .catch(error=> error.toJSON());

  },

  updateTrivia:(data:triviaData, index:number) =>{

    console.log({
      gameName:data.gameName,
      slide: JSON.parse(data.slides),
      index
      })
    return  axios.put(endpoint+"/"+index, data )
    .then(response =>  response.data)
    .catch(error=> error.toJSON());

  },

  deleteTrivia:( index:number) =>{
    return  axios.delete(endpoint+"/"+index )
    .then(response =>  response.data)
    .catch(error=> error.toJSON());
  }
}

export default EditorService;