import { axiosInstance } from "../lib/axios";
import { BEARER } from "../constant";
import { getToken } from "@/helpers";


export const getProfile = async (token: String) => {
    const response = await axiosInstance.get('/user/profile', {
        headers: { Authorization: `${BEARER} ${token}` },
    });
    return response.data
};

export const handleLogout = async() => {
    const token = getToken();
    const response = await axiosInstance.post('/user/logout',{}, {
        headers: { Authorization: `${BEARER} ${token}` },
    });
    return response.data
}