import { useMutation } from 'react-query';
import axios from 'axios';


const uploadPhoto = async ( file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post('http://127.0.0.1:8000/image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

const useUploadPhoto = () => {
  return useMutation(uploadPhoto);
};

export default useUploadPhoto;
