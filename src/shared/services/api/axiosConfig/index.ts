import axios from "axios";
import { errorInterceptor, responseInterceptor } from "./interceptors";
import { Enviroment } from "../../../environment";

// Criação da instância do Axios sem definir o header 'Authorization' aqui
const API = axios.create({
    baseURL: Enviroment.URL_BASE,
});

// Interceptor de requisição para adicionar o token JWT a cada requisição
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('APP_ACCESS_TOKEN');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Interceptors de resposta já existentes
API.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error),
);

export { API };