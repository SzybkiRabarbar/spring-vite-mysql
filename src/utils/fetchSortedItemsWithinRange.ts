import axios from "axios";
import fetchSettings from "../interfaces/fetchSettings";


var url = 'http://localhost:8080/products'

type MutationFn = (settings: fetchSettings) => Promise<Product[]>;

const fetchSortedItemsWithinRange: MutationFn = async (settings) => {
// async function fetchSortedItemsWithinRange(settings: fetchSettings): Promise<Product[]> {
    const response = await axios.post(url, settings);
    return response.data;
};

export default fetchSortedItemsWithinRange