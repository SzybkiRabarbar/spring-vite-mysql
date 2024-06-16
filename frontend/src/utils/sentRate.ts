import axios from "axios";
import { useMutation } from "react-query";
import { BACKEND_PATH } from "./consts";

interface rateData {
    productId: string;
    rate: number;
    token: String;
}

const uploadRate = async ({productId, rate, token}: rateData) => {
    const response = await axios.post(
        BACKEND_PATH + "/rate",
        {
            productId,
            rate,
        },
        {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        },
    )
    return response.data;
};

const useUploadRate = () => {
    return useMutation((data: rateData) => uploadRate(data),{
        onSuccess: () => {
            window.location.reload();
        }
    });
};

export default useUploadRate;