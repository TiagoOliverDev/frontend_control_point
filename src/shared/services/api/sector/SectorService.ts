import { Enviroment } from "../../../environment";
import { API } from "../axiosConfig";

// alocar essas tipagems dentro de @types e importar
export interface IListSetor {
    id: number;
    nomeSetor: string;
};

export interface IDetailsSetor {
    id: number;
    nomeSetor: string;
};

type TSetorComTotalCount = {
    data: IListSetor[];
    totalCount: number;
};

const getAll = async (page = 1, filter = ""): Promise<TSetorComTotalCount | Error> => {
    try {
        const urlRelative = `/setor?_page=${page}&_limit=${Enviroment.LIMITE_DE_LINHAS}&nomeSetor_like=${filter}`;

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

const getById = async (id: number): Promise<IDetailsSetor | Error> => {
    try {
        const urlRelative = `/setor/${id}`;

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

const create = async (dados: Omit<IDetailsSetor, "id">): Promise<number | Error> => {
    try {

        const { data } = await API.post<IDetailsSetor>("/setor", dados);

        if (data) {
            return data.id;
        };

        return new Error("Erro ao criar o registro.");
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao consultar o registro.");
    };
};

const updateById = async (id: number, dados: IDetailsSetor): Promise<void | Error> => {
    try {
        await API.put(`/setor/${id}`, dados);
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao atualizar o registro.");
    };
};

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        await API.delete(`/setor/${id}`);
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao deletar o registro.");
    };
};

export const SectorService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};