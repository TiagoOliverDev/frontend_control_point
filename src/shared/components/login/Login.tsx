import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from "@mui/material"
import { useAuthContext } from "../../contexts";
import { useState } from "react";
import * as yup from 'yup'
import { Password } from "@mui/icons-material";
import { error } from "console";

const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(5),
})

interface ILoginProps{
    children: React.ReactNode;
}

export const Login: React.FC<ILoginProps> = ({ children }) => {
    const { isAuthenticated, login } = useAuthContext();

    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = () => {
        setIsLoading(true)

        loginSchema
            .validate({ email, password }, { abortEarly: false })
            .then( dadosValidados => {
                setIsLoading(true)
                login(dadosValidados.email, dadosValidados.password)
                .then(() => {
                    setIsLoading(false)
                })
            })
            .catch((errors: yup.ValidationError) => {
                setIsLoading(false)
                errors.inner.forEach(error => {
                    if(error.path === 'email'){
                        setEmailError(error.message)
                    }else if (error.path === 'password'){
                        setPasswordError(error.message)
                    }
                })
            })
    }
    
    // se estiver autenticado
    if (isAuthenticated) return (
        <>{children}</>
    )

    // se não, mostra a tela de login.
    return(
        <Box width={'100vw'} height={'100vh'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
            
            <Card>
                <CardContent>
                    <Box display={'flex'} flexDirection={'column'} gap={2} width={350}>
                        <Typography variant="h6" align="center">Login</Typography>

                        <TextField
                            fullWidth
                            type="email"
                            label='Email'
                            value={email}
                            disabled={isLoading}
                            error={!!emailError}
                            helperText={emailError}
                            onKeyDown={() => setEmailError('')}
                            onChange={e => setEmail(e.target.value)}
                        />

                        <TextField
                            fullWidth
                            label='Senha'
                            type="password"
                            value={password}
                            disabled={isLoading}
                            error={!!passwordError}
                            helperText={passwordError}
                            onKeyDown={() => setPasswordError('')}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Box>
                
                </CardContent>

                    <CardActions>
                        <Box width={'100%'} display={'flex'} justifyContent={'center'}>

                            <Button
                                variant="contained"
                                disabled={isLoading}
                                onClick={handleSubmit}
                                endIcon={isLoading ? <CircularProgress size={20} variant="indeterminate" color="inherit" /> : undefined}
                            >
                                Entrar
                            </Button>

                        </Box>
                    </CardActions>
            </Card>

        </Box>
    )
}