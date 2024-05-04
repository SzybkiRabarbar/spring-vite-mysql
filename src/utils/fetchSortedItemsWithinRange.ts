import axios from "axios";
import fetchSettings from "../interfaces/fetchSettings";
import { BACKEND_PATH } from "./consts";
import Product from "../interfaces/Product";



type MutationFn = (settings: fetchSettings) => Promise<Product[]>;

const fetchSortedItemsWithinRange: MutationFn = async (settings) => {
    const response = await axios.post(BACKEND_PATH + '/products', settings);
    return response.data;
};

export default fetchSortedItemsWithinRange