import axios from "axios";
const endpoint = import.meta.env.VITE_API_ENDPOINT + "messages";
// const headers = { "content-type":"application/json"}
// interface messageType {
//   room_id: string;
//   username: string;
//   message_body: string;
// }


const msgService = {

  fetchMessages :(room_id: string) =>{
    return axios.get(endpoint + `/${room_id}`)
      .then(response => {
        return response.data;
      });
  },
 /** messages saved on the server end when emitted by socket */
  // postMessages:()=> {
  //   return axios.post(endpoint)
  //     .then(response => {
  //       return response.data;
  //     });
  // }
}

export default msgService;