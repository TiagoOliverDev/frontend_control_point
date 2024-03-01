import axios from "axios";

import { errorInterceptor, responseInterceptor } from "./interceptors";
import { Enviroment } from "../../../environment";


const headers: Record<string, string> = {};

const token = localStorage.getItem('APP_ACCESS_TOKEN');
if (token) {
    headers['Authorization'] = `Bearer ${token}`;
}

const API = axios.create({
    baseURL: Enviroment.URL_BASE,
    headers: headers,
});

API.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error),
);

export { API };
