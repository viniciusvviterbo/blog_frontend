import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL_DEV ?? "REACT_APP_API_URL_DEV",
});

export default api;
