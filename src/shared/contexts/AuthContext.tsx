import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

import { AuthService } from "../services/api/auth/AuthService";


interface IAuthCOntextData {
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<string | void>
    logout: () => void; // não precisa ser Promise pois não vai se conectar com o back
}

interface IAuthProvideProps{
    children: React.ReactNode;
}

const AuthContext = createContext({} as IAuthCOntextData ) // injetando as props de IAuthCOntextData no context

const LOCAL_STORAGE_KEY_ACCESS_TOKEN = 'APP_ACCESS_TOKEN'


export const AuthProvider: React.FC<IAuthProvideProps> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string>()

    useEffect(() => {
        const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);

        if (accessToken){
            setAccessToken(JSON.parse(accessToken))
        } else {
            setAccessToken(undefined);
        }

    })

    const handleLogin = useCallback(async (email: string, password: string ) => {
        const result = await AuthService.auth(email, password);

        if (result instanceof Error){
            return result.message
        } else {          
            localStorage.setItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN, JSON.stringify(result.BearerToken)) // Salvando token no local storage
            setAccessToken(result.BearerToken)
        }

    }, []);

    const handleLogout = useCallback(() => {
        localStorage.removeItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN)
        setAccessToken(undefined)
    }, []);
    
    const isAuthenticated = useMemo(() => !!accessToken, [accessToken])


    return (
        // Funções passadas em contexto obrigatoriamente tem que usar o useCallback para não prejudicar o desempenho
        <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, logout: handleLogout }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);


