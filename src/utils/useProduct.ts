import { UseQueryResult, useQuery } from 'react-query';
import axios from 'axios';
import Product from '../interfaces/Product';
import { BACKEND_PATH } from './consts';


const useProduct = (productId: string | undefined): UseQueryResult<Product, Error> => {

    const fetchProduct = async (productId: string | undefined): Promise<Product> => {
        if (!productId) {
            throw new Error('ProductId is undefined');
        }
        const { data } = await axios.get(BACKEND_PATH + `/product/${productId}`);
        return data;
    };

    return useQuery(['product', productId], () => fetchProduct(productId));
};

export default useProduct