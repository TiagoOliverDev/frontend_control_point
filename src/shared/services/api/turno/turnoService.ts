import { Enviroment } from "../../../environment";
import { API } from "../axiosConfig";

export interface IListTurno {
    id: number;
    tipo: string;
};

export interface IDetailsTurno{
    id: number;
    tipo: string;
};

type TTurnoComTotalCount = {
    data: IListTurno[];
    totalCount: number;
};

const getAll = async (page = 1, filter = ""): Promise<TTurnoComTotalCount | Error> => {
    try {   
        const urlRelative = `/turno?_page=${page}&_limit=${Enviroment.LIMITE_DE_LINHAS}&tipo_like=${filter}`;

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

const getById = async (id: number): Promise<IDetailsTurno | Error> => {
    try {
        const urlRelative = `/turno/${id}`;

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

const create = async (dados: Omit<IDetailsTurno, "id">): Promise<number | Error> => {
    try {

        const { data } = await API.post<IDetailsTurno>("/turno", dados);

        if (data) {
            return data.id;
        };

        return new Error("Erro ao criar o registro.");
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao consultar o registro.");
    };
};

const updateById = async (id: number, dados: IDetailsTurno): Promise<void | Error> => {
    try {
        await API.put(`/turno/${id}`, dados);
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao atualizar o registro.");
    };
};

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        await API.delete(`/turno/${id}`);
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao deletar o registro.");
    };
};

export const TurnoService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};