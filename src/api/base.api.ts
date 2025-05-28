import axios from "axios";

const BASE_URL = import.meta.env.VITE_SICEI_API_ORIGIN;

export const apiInstance = axios.create({
    baseURL: BASE_URL
});