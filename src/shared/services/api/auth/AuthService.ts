import { API } from "../axiosConfig";

interface IAuth {
    BearerToken: string;
    id_user: number;
}


const auth = async (email: string, password: string): Promise<IAuth | Error> => {
    try {

        // Na api do backend mesmo deve ser POST, está GET somente por conta do mock
        const { data } = await API.post<IAuth>("/auth/login", {email,password});
        // const { data } = await API.get("/auth", { data:{email,password} });
        
        if (data) {
            return data;
        };

        return new Error("Erro no login.");
    } catch (error) {
        console.error(error);
        return new Error((error as { message: string }).message || "Erro no login..");
    };
};



export const AuthService = {
    auth,
};