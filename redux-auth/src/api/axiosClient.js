import axios from "axios";

const axiosClient = axios.create({
    baseURL: "/",
});

axiosClient.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

axiosClient.interceptors.response.use(
    function (response) {
        if (response && response.data) return response.data;
        return response;
    },
    function (error) {
        return Promise.reject(error?.response?.data || error);
    },
);

export default axiosClient;
