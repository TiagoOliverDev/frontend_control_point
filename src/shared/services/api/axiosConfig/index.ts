import axios from "axios";

import { errorInterceptor, responseInterceptor } from "./interceptors";
import { Enviroment } from "../../../environment";

const API = axios.create({
    baseURL: Enviroment.URL_BASE,
    // headers: {
    //     // Enviando JWT do local storage para cada requisição que for feito no back
    //     Authorization: `Bearer ${JSON.parse(localStorage.getItem('APP_ACCESS_TOKEN') || '' )}`,
    // }
});

API.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error),
);

export { API };