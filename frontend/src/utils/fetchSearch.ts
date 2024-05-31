import axios from "axios";
import { BACKEND_PATH as BACKEND_PATH_V1 } from "./consts";
import fetchSearchParams from "../interfaces/fetchSearchParams";
import PageWithProducts from "../interfaces/PageProduct";

type MutationFn = (params: fetchSearchParams) => Promise<PageWithProducts>;

const fetchSearch: MutationFn = async ({ query, pageNum }) => {
  const response = await axios.get(BACKEND_PATH_V1 + '/search-products', {
    params: {
      query,
      pageNum,
    },
  });
  return response.data;
};

export default fetchSearch