import { Enviroment } from "../../../environment";
import { API } from "../axiosConfig";

interface IPoint {
    id: number | undefined | null | '';
    id_usuario: number | undefined;
    id_tipo_ponto: number;
    nome: string | undefined;
    tipoPonto: string | undefined;
    dataHora: string;
  }
  

export interface IDetaisPoint{
    id: number;
    id_usuario: number | undefined;
    id_tipo_ponto: number;
    // nome: string | undefined;
    // tipoPonto: string | undefined;
};

type TPointComTotalCount = {
    data: IPoint[];
    totalCount: number;
};

const getAll = async (userId: any, page = 1, filter = ""): Promise<TPointComTotalCount | Error> => {
    try {
        const urlRelative = `/point/all_points_from_user/${userId}?_page=${page}&_limit=${Enviroment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`;
        const { data, headers } = await API.get(urlRelative);

        if (data && data.points) {
            // Achata a estrutura de arrays aninhados e filtra quaisquer valores nulos
            const flattenedPoints = data.points.flat(Infinity).filter((point: IPoint | null) => point !== null);

            return {
                data: flattenedPoints,
                totalCount: Number(headers['x-total-count'] || Enviroment.LIMITE_DE_LINHAS),
            };
        }
        return new Error("Erro ao listar os registros.");
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao listar os registros.");
    }
};

const getById = async (id: number): Promise<IDetaisPoint | Error> => {
    try {
        const urlRelative = `/registerPoint/${id}`;

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

const create = async (dados: Omit<IDetaisPoint, "id">): Promise<number | Error> => {
    try {

        const { data } = await API.post<IDetaisPoint>("/point/create_point", dados);

        if (data) {
            return data.id;
        };

        return new Error("Erro ao criar o registro.");
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao consultar o registro.");
    };
};

const updateById = async (id: number, dados: IDetaisPoint): Promise<void | Error> => {
    try {
        await API.put(`/registerPoint/${id}`, dados);
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao atualizar o registro.");
    };
};

const deleteById = async (id: number): Promise<void | Error> => {
    try {
        await API.delete(`/registerPoint/${id}`);
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro ao deletar o registro.");
    };
};

export const PointService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};