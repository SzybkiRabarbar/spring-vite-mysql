import { useQuery } from 'react-query';
import axios from 'axios';
import { BACKEND_PATH } from './consts';

const fetchRate = async (productId: string | undefined, token: String | null) => {
  try {
    const { data } = await axios.get(`${BACKEND_PATH}/rate?productId=${productId}`, {
      headers: {
        Authorization: token?.toString()
      }
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching rate:', error);
    return null;
  }
};


const useRate = (productId: string | undefined, token: String | null) => {
  return useQuery(['rate', productId], () => fetchRate(productId, token), {
    cacheTime: 0,
    staleTime: 0
  });
};

export default useRate