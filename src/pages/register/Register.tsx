import { useEffect, useState } from "react";
import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from "@mui/material"
import * as yup from 'yup'
import { UForm, useUForm, IUFormErrors, UTexField } from "../../shared/components/forms";

import { RegisterAdminService } from "../../shared/services/api/registerAdmin/RegisterAdminService";
import { useNavigate, useParams } from "react-router-dom";



interface IFormData {
    name: string;
    email: string;
    senha: string;
    matricula: string;
    tipo_permissao: number;
};

const formRegisterSchema: yup.Schema<IFormData> = yup.object().shape({
    name: yup.string().required().min(5),
    email: yup.string().email().required(),
    senha: yup.string().required().min(5),
    matricula: yup.string().required().min(5),
    tipo_permissao: yup.number().required(),
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
    
    useEffect(() => {
        if (id === "new") {
            formRef.current?.setData({
                name: "",
                email: "",
                senha: "",
                matricula: "",
                tipo_permissao: "",
            });
        };
    }, [id]);


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
        <UForm placeholder={'Cadasto admin'} ref={formRef} onSubmit={handleSave}>
            <Box width={'100vw'} height={'100vh'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                <Card>
                    <CardContent>
                        <Box display={'flex'} flexDirection={'column'} gap={2} width={350}>
                            <Typography variant="h6" align="center">Cadastro ADMIN</Typography>

                            <UTexField
                                fullWidth
                                type="text"
                                label='Nome completo'
                                name="name"
                                disabled={isLoading}
                                onChange={e => setName(e.target.value)}
                            />

                            <UTexField
                                fullWidth
                                type="text"
                                label='Matrícula'
                                name="matricula"
                                placeholder="Ex: 7032024"
                                disabled={isLoading}
                                onChange={e => setMatricula(e.target.value)}
                            />

                            <UTexField
                                fullWidth
                                type="email"
                                label='Email'
                                name="email"
                                disabled={isLoading}
                                onChange={e => setEmail(e.target.value)}
                            />

                            <UTexField
                                fullWidth
                                label='Senha'
                                type="password"
                                name="senha"
                                disabled={isLoading}
                                onChange={e => setPassword(e.target.value)}
                            />

                            <UTexField
                                fullWidth
                                label='Tipo permissão'
                                type="tipo_permissao"
                                name="tipo_permissao"
                                disabled={isLoading}
                                placeholder="Digite 2 para cadastrar como ADMIN"
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