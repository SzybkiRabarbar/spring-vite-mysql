import { useMutation } from 'react-query';
import axios from 'axios';
import { BACKEND_PATH } from './consts';


const uploadPhoto = async (
  { file, token }: { file: File, token: String }) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post(
    BACKEND_PATH + "/image",
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
    });

  return response.data;
};

const useUploadPhoto = () => {
  return useMutation((data: {
    file: File, token: String
  }) => uploadPhoto(data));
};

export default useUploadPhoto;
