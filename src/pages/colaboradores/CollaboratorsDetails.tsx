import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";

import { UTexField, UForm, useUForm, IUFormErrors } from "../../shared/components/forms";
import { CollaboratorService } from "../../shared/services/api/collaborator/CollaboratorService"; 
import { AutoCompleteTurno } from "./components/AutoCompleteTurno"; 
import { AutoCompleteSetor } from "./components/AutoCompleteSetor"; 
import { LayoutBasePages } from "../../shared/layouts";
import { DetailTools } from "../../shared/components";
import * as yup from "yup";

interface IFormData {
    nomeCompleto: string;
    matricula: string;
    email: string;
    setor: string;
    turno: string;
};

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
    nomeCompleto: yup.string().required().min(3),
    matricula: yup.string().required(),
    email: yup.string().required().email(),
    setor: yup.string().required(),
    turno: yup.string().required(),
});

export const CollaboratorsDetails: React.FC = () => {

    const { id = "new" } = useParams<"id">();
    const navigate = useNavigate();
    const { formRef, save, saveAndClose, isSaveAndClose } = useUForm();

    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [matricula, setMatricula] = useState('');
    const [email, setEmail] = useState('');
    const [setor, setSetor] = useState('');
    const [turno, setTurno] = useState('');

    useEffect(() => {
        if (id !== "new") {

            setIsLoading(true);

            CollaboratorService.getById(Number(id))
                .then((result) => {

                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                        navigate("/persons");
                    } else {
                        console.log(result)
                        setName(result.nomeCompleto);
                        setMatricula(result.matricula)
                        setEmail(result.email)
                        setSetor(result.setor)
                        setTurno(result.turno)
                        formRef.current?.setData(result);
                    };
                });
        } else {

            formRef.current?.setData({
                nomeCompleto: "",
                matricula: undefined,
                email: "",
                setor: undefined,
                turno: undefined,

            });
        };
    }, [id]);

    const handleSave = (data: IFormData) => {

        formValidationSchema
            .validate(data, { abortEarly: false })
            .then((datasValidated) => {

                setIsLoading(true);

                if (id === "new") {
                    CollaboratorService
                        .create(datasValidated)
                        .then((result) => {

                            setIsLoading(false);

                            if (result instanceof Error) {
                                alert(result.message);
                            } else {
                                
                                if (isSaveAndClose()) {
                                    navigate("/persons");
                                } else {
                                    navigate(`/persons`);
                                };
                            };
                        });
                } else {

                    CollaboratorService
                        .updateById(Number(id), { id: Number(id), ...datasValidated })
                        .then((result) => {

                            setIsLoading(false);

                            if (result instanceof Error) {
                                alert(result.message);
                            } else {

                                if (isSaveAndClose()) {
                                    navigate("/persons");
                                };
                            };
                        });
                };
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

    const handleDelete = (id: number) => {
        if (window.confirm("Realmente deseja excluir esse resgistro?")) {
            CollaboratorService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        alert("Registro apagado com sucesso");
                        navigate('/persons');
                    };
                });
        };
    };

    return (
        <LayoutBasePages
            title={id === "new" ? "Novo colaborador" : name}
            toobar={
                <DetailTools
                    textButtonNew="Nova"
                    showButtonSaveAndClose
                    showButtonSave={id !== "new"}
                    showButtonDelete={id !== "new"}

                    whenCilickingButtonBack={() => navigate("/persons")}
                    whenCilickingButtonDelete={() => handleDelete(Number(id))}
                    whenCilickingButtonSave={save}
                    whenCilickingButtonNew={() => navigate("/persons/details/new")}
                    whenCilickingButtonSaveAndClose={saveAndClose}
                />
            }
        >

        <UForm placeholder={'Cadastro de colaborador'} ref={formRef} onSubmit={handleSave}>
            <Box m={1} display={"flex"} flexDirection={"column"} component={Paper} variant="outlined">

                <Grid container direction={"column"} padding={2} spacing={2}>

                    <Grid item>
                        {isLoading && (
                            <LinearProgress variant="indeterminate" />
                        )}
                    </Grid>

                    <Grid item>
                        <Typography variant="h6">Formulário</Typography>
                    </Grid>

                    <Grid container item direction={"row"} spacing={2}>

                        <Grid item xs={12} md={6} lg={4} xl={2}>

                            <UTexField
                                fullWidth
                                disabled={isLoading}
                                label="Nome completo"
                                value={name}
                                name="nomeCompleto"
                                onChange={e => setName(e.target.value)} 
                            />

                        </Grid>
                    </Grid>

                    
                    <Grid container item direction={"row"} spacing={2}>

                        <Grid item xs={12} md={6} lg={4} xl={2}>

                            <UTexField
                                type="text"
                                fullWidth
                                disabled={isLoading}
                                label="Matrícula"
                                value={matricula}
                                name="matricula"
                                onChange={e => setMatricula(e.target.value)} />

                        </Grid>
                    </Grid>

                    <Grid container item direction={"row"} spacing={2}>
                        <Grid item xs={12} md={6} lg={4} xl={2}>

                            <UTexField
                                fullWidth
                                disabled={isLoading}
                                label="E-mail"
                                value={email}
                                name="email" 
                                onChange={e => setEmail(e.target.value)} />
                        </Grid>
                    </Grid>

                    <Grid container item direction={"row"} spacing={2}>
                        <Grid item xs={12} md={6} lg={4} xl={2}>

                            <AutoCompleteSetor isExternalLoading={isLoading} />

                        </Grid>
                    </Grid>

                    <Grid container item direction={"row"} spacing={2}>
                        <Grid item xs={12} md={6} lg={4} xl={2}>

                            <AutoCompleteTurno isExternalLoading={isLoading} />

                        </Grid>
                    </Grid>

                </Grid>

            </Box>
        </UForm>

        </LayoutBasePages>
    );
};