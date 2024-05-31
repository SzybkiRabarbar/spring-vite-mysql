import axios from 'axios';
import { BACKEND_PATH } from './consts';

interface User {
  username: string;
  password: string;
}

const callLogin = async (user: User) => {
  try {
    const response = await axios.post(BACKEND_PATH + '/login', user);
    return { status: response.status, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return { status: error.response?.status, data: error.message };
    }
    return { status: 500, data: 'Unknown error occurred' };
  }
};

export default callLogin;
