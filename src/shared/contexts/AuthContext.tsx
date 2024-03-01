import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

import { AuthService } from "../services/api/auth/AuthService";


interface IAuthCOntextData {
    isAuthenticated: boolean;
    id_user: number | undefined;
    login: (email: string, password: string) => Promise<string | void>
    logout: () => void; // não precisa ser Promise pois não vai se conectar com o back
}

interface IAuthProvideProps{
    children: React.ReactNode;
}

const AuthContext = createContext({} as IAuthCOntextData ) // injetando as props de IAuthCOntextData no context

const LOCAL_STORAGE_KEY_ACCESS_TOKEN = 'APP_ACCESS_TOKEN'
const LOCAL_STORAGE_KEY_USER_ID = 'APP_USER_ID';


export const AuthProvider: React.FC<IAuthProvideProps> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string>()
    const [userId, setUserId] = useState<number | undefined>();

    useEffect(() => {
        const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
        const storedUserId = localStorage.getItem(LOCAL_STORAGE_KEY_USER_ID);

        if (accessToken){
            setAccessToken(JSON.parse(accessToken))
        } else {
            setAccessToken(undefined);
        }

        if (storedUserId) {
            setUserId(JSON.parse(storedUserId));
        }

    })

    const handleLogin = useCallback(async (email: string, password: string ) => {
        const result = await AuthService.auth(email, password);

        if (result instanceof Error){
            return result.message
        } else {          
            localStorage.setItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN, JSON.stringify(result.BearerToken)) // Salvando token no local storage
            localStorage.setItem(LOCAL_STORAGE_KEY_USER_ID, JSON.stringify(result.id_user));
            setAccessToken(result.BearerToken)
            setUserId(result.id_user);
        }

    }, []);

    const handleLogout = useCallback(() => {
        localStorage.removeItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
        localStorage.removeItem(LOCAL_STORAGE_KEY_USER_ID);
        setAccessToken(undefined);
        setUserId(undefined);
    }, []);
    
    const isAuthenticated = useMemo(() => !!accessToken, [accessToken])


    return (
        // Funções passadas em contexto obrigatoriamente tem que usar o useCallback para não prejudicar o desempenho
        <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, logout: handleLogout, id_user: userId }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);


