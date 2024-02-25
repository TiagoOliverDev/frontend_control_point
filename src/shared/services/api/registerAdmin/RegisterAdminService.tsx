import { Enviroment } from "../../../environment";
import { API } from "../axiosConfig";

export interface IListagemCollaborator {
    id: number;
    nomeCompleto: string;
    matricula: string;
    email: string;
    password: string;
    confirmPassword: string;
};

export interface IDetaisCollaborator {
    id: number;
    nomeCompleto: string;
    matricula: string;
    email: string;
    password: string;
    confirmPassword: string;
};

type TCollaboratorComTotalCount = {
    data: IListagemCollaborator[];
    totalCount: number;
};

const getAll = async (page = 1, filter = ""): Promise<TCollaboratorComTotalCount | Error> => {
    try {
        const urlRelative = `/colaboradores?_page=${page}&_limit=${Enviroment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`;

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

const getById = async (id: number): Promise<IDetaisCollaborator | Error> => {
    try {
        const urlRelative = `/colaboradores/${id}`;

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

const create = async (dados: Omit<IDetaisCollaborator, "id">): Promise<number | Error> => {
    try {

        const { data } = await API.post<IDetaisCollaborator>("/colaboradores", dados);

        if (data) {
            return data.id;
        };

        return new Error("Erro ao criar o registro.");
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao consultar o registro.");
    };
};

const updateById = async (id: number, dados: IDetaisCollaborator): Promise<void | Error> => {
    try {
        await API.put(`/colaboradores/${id}`, dados);
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao atualizar o registro.");
    };
};

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        await API.delete(`/colaboradores/${id}`);
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