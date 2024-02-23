import { Enviroment } from "../../../environment";
import { API } from "../axiosConfig";

export interface IListagemCollaborator {
    id: number;
    email: string;
    nomeAcademia: string;
};

export interface IDetaisCollaborator {
    id: number;
    email: string;
    nomeAcademia: string;
};

type TCollaboratorComTotalCount = {
    data: IListagemCollaborator[];
    totalCount: number;
};

const getAll = async (page = 1, filter = ""): Promise<TCollaboratorComTotalCount | Error> => {
    try {
        const urlRelative = `/academias?_page=${page}&_limit=${Enviroment.LIMITE_DE_LINHAS}&nomeAcademia_like=${filter}`;

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
        const urlRelative = `/academias/${id}`;

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

        const { data } = await API.post<IDetaisCollaborator>("/academias", dados);

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
        await API.put(`/academias/${id}`, dados);
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao atualizar o registro.");
    };
};

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        await API.delete(`/academias/${id}`);
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao deletar o registro.");
    };
};

export const StatusCollaboratorService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};