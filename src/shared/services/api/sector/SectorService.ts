import { Enviroment } from "../../../environment";
import { API } from "../axiosConfig";

// alocar essas tipagems dentro de @types e importar
export interface IListSetor {
    id: number;
    nomeSetor: string;
    created_at: string;
    updated_at: string;
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
        // Atualize a URL para corresponder ao endpoint da sua API Flask
        const urlRelative = `/sector/list_all_sectors?_page=${page}&nomeSetor_like=${filter}`;

        const { data } = await API.get(urlRelative);

        if (data && data.sectors) {
            return {
                data: data.sectors[0], // Supondo que os setores estão no primeiro elemento do array retornado
                totalCount: data.sectors[0].length, // Supondo que o total de setores é o tamanho do primeiro elemento do array
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
        const urlRelative = `/sector/sector/${id}`;

        const { data } = await API.get(urlRelative);

        if (data && data.sector) {
            return data.sector[0];
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