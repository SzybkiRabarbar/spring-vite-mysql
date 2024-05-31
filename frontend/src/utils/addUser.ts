import axios from "axios";
import { BACKEND_PATH } from "./consts";
import User from "../interfaces/User";


const addUser = async (user: User) => {
  try {
    const response = await axios.post<User>(BACKEND_PATH + '/users', user);
    return response.status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.status;
    }
  }
};

export default addUser