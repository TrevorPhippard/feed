import axios from "axios";

class UploadFilesService {
  async upload(data:any) {
        const { file, fileName, fileExtension, fileMimeType } = data;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const encodedFile = reader.result.split(",")[1];
        const data = {
          file: encodedFile,
          fileName: fileName,
          fileExtension: fileExtension,
          fileMimeType: fileMimeType,
        };
        try {
          const endpoint = import.meta.env.VITE_API_ENDPOINT + '/upload:test';
          const response = await axios.post(endpoint, data);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };
  }

  async getFiles(filename: string) {
    return axios.get(`/images/${filename}`);
  }
}

export default new UploadFilesService();