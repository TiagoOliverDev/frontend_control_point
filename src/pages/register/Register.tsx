import { useState } from "react";
import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from "@mui/material"
import * as yup from 'yup'
import { UForm, useUForm, IUFormErrors } from "../../shared/components/forms";

import { RegisterAdminService } from "../../shared/services/api/registerAdmin/RegisterAdminService";
import { useNavigate, useParams } from "react-router-dom";



interface IFormData {
    nomeCompleto: string;
    matricula: string;
    email: string;
    password: string;
    confirmPassword: string;
};


const formRegisterSchema = yup.object().shape({
    nomeCompleto: yup.string().required().min(5),
    matricula: yup.string().required().min(5),
    email: yup.string().email().required(),
    password: yup.string().required().min(5),
    confirmPassword: yup.string().required().min(5),
})


export const Register: React.FC = () => {
    const { id = "new" } = useParams<"id">();
    const navigate = useNavigate();

    const { formRef } = useUForm();

    const [isLoading, setIsLoading] = useState(false);

    const [name, setName] = useState('');
    const [matricula, setMatricula] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    const [nameError, setNameError] = useState('');
    const [matriculaError, setMatriculaError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const teste = () => {
        console.log(name)
        console.log(matricula)
        console.log(email)
        console.log(password)
        console.log(confirmPassword)
    }


    const handleSave = (data: IFormData) => {

        formRegisterSchema
            .validate(data, { abortEarly: false })
            .then((datasValidated) => {

                setIsLoading(true);

                if (id === "new") {
                    RegisterAdminService
                        .create(datasValidated)
                        .then((result) => {

                            setIsLoading(false);

                            if (result instanceof Error) {
                                alert(result.message);
                            } else {
                                navigate("/login");
                            };
                        });
                }
            })
            .catch((errors: yup.ValidationError) => {
                const validationErrors: IUFormErrors = {};

                errors.inner.forEach(error => {
                    if (!error.path) return;

                    validationErrors[error.path] = error.message;
                    formRef.current?.setErrors(validationErrors);
                });

                console.log(validationErrors);
            });
    };
    
    return(
        <UForm placeholder={'Cadasto de setor'} ref={formRef} onSubmit={teste}>
            <Box width={'100vw'} height={'100vh'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                <Card>
                    <CardContent>
                        <Box display={'flex'} flexDirection={'column'} gap={2} width={350}>
                            <Typography variant="h6" align="center">Cadastro</Typography>

                            <TextField
                                fullWidth
                                type="text"
                                label='Nome completo'
                                value={name}
                                disabled={isLoading}
                                error={!!nameError}
                                helperText={nameError}
                                onKeyDown={() => setNameError('')}
                                onChange={e => setName(e.target.value)}
                            />

                            <TextField
                                fullWidth
                                type="text"
                                label='Matrícula'
                                placeholder="Ex: 7032024"
                                value={matricula}
                                disabled={isLoading}
                                error={!!matriculaError}
                                helperText={matriculaError}
                                onKeyDown={() => setMatriculaError('')}
                                onChange={e => setMatricula(e.target.value)}
                            />

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

                            <TextField
                                fullWidth
                                label='Confirmar senha'
                                type="password"
                                value={confirmPassword}
                                disabled={isLoading}
                                onChange={e => setConfirmPassword(e.target.value)}
                            />

                            <Typography variant="body2" align="center">*Já possui uma conta? <a href="/login" style={{color: '#0066cc', textDecoration: 'none'}}>Clique aqui!</a></Typography>

                        </Box>
                    
                    </CardContent>

                        <CardActions>
                            <Box width={'100%'} display={'flex'} justifyContent={'center'}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={isLoading}
                                    endIcon={isLoading ? <CircularProgress size={20} variant="indeterminate" color="inherit" /> : undefined}
                                >
                                    Cadastrar
                                </Button>
                            </Box>
                        </CardActions>
                </Card>
            </Box>
        </UForm>
    )
}