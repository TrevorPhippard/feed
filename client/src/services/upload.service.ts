import axios from 'axios';

class UploadFilesService {
  async upload(formData: any) {
    const endpoint = import.meta.env.VITE_API_ENDPOINT + '/api/upload:id';
      try {
        axios.post(endpoint, formData)
        .then(function (result) {
          console.log(result);
        }, function (error) {
          console.log(error);
        });
      } catch (error) {
        console.error(error);
      }


  }

  async getFiles(filename: string) {
    return axios.get(`/images/${filename}`);
  }
}

export default new UploadFilesService();