import { Enviroment } from "../../../environment";
import { API } from "../axiosConfig";
// import dotenv from 'dotenv';

export interface IListAdmin {
    id: number;
    nomeCompleto: string;
    matricula: string;
    email: string;
    password: string;
};

export interface IDetaisAdmin {
    id: number;
    name: string;
    email: string;
    password: string;
    matricula: string;
    tipo_permissao: number;
};

type TCollaboratorComTotalCount = {
    data: IListAdmin[];
    totalCount: number;
};

// dotenv.config();
// const API_HOST = process.env.API_HOST;

const getAll = async (page = 1, filter = ""): Promise<TCollaboratorComTotalCount | Error> => {
    try {
        const urlRelative = `/cadastroAdmin?_page=${page}&_limit=${Enviroment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`;

        const { data, headers } = await API.get(urlRelative);

        if (data) {
            return {
                data,
                totalCount: Number(headers['x-total-count'] || Enviroment.LIMITE_DE_LINHAS), // envia o Hrader com totalCount na minha api
            };
        };
        return new Error("Erro ao listar os registros.");
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao listar os registros.");
    };
};

const getById = async (id: number): Promise<IDetaisAdmin | Error> => {
    try {
        const urlRelative = `/cadastroAdmin/${id}`;
        
        const { data } = await API.get(urlRelative);

        if (data) {
            return data;
        };

        return new Error("Erro ao  consultar o registro.");

    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao consultar o registro.");
    };
};

const create = async (dados: Omit<IDetaisAdmin, "id">): Promise<number | Error> => {
    try {

        const { data } = await API.post<IDetaisAdmin>(`/auth/register`, dados);

        if (data) {
            return data.id;
        };

        return new Error("Erro ao criar o registro.");
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao consultar o registro.");
    };
};

const updateById = async (id: number, dados: IDetaisAdmin): Promise<void | Error> => {
    try {
        await API.put(`/cadastroAdmin/${id}`, dados);
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao atualizar o registro.");
    };
};

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        await API.delete(`/cadastroAdmin/${id}`);
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao deletar o registro.");
    };
};

export const RegisterAdminService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};