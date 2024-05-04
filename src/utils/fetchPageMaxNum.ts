import axios from "axios";
import { BACKEND_PATH, PAGE_SIZE } from "./consts";


const fetchPageMaxNum = async () => {
  const { data } = await axios.get<number>(BACKEND_PATH + '/page-max-num');
  return Math.ceil(data / PAGE_SIZE);
};

export default fetchPageMaxNum