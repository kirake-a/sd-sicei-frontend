import axios from "axios";

const BASE_URL = "http://localhost:8000";

export const api_instance = axios.create({
    baseURL: BASE_URL
});