import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";

import { UTexField, UForm, useUForm, IUFormErrors } from "../../shared/components/forms";
import { SectorService } from "../../shared/services/api/sector/SectorService"; 
import { LayoutBasePages } from "../../shared/layouts";
import { DetailTools } from "../../shared/components";
import * as yup from "yup";

interface IFormData {
    nomeSetor: string;
};

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
    nomeSetor: yup.string().required().min(3),
});

export const SectorDetails: React.FC = () => {

    const { id = "new" } = useParams<"id">();
    const navigate = useNavigate();
    const { formRef, save, saveAndClose, isSaveAndClose } = useUForm();

    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        if (id !== "new") {

            setIsLoading(true);

            SectorService.getById(Number(id))
                .then((result) => {

                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                        navigate(`/sector`);
                    } else {
                        setName(result.nomeSetor);
                        formRef.current?.setData(result);
                    };
                });
        } else {

            formRef.current?.setData({
                nomeSetor: "",
            });
        };
    }, [id]);

    const handleSave = (data: IFormData) => {

        formValidationSchema
            .validate(data, { abortEarly: false })
            .then((dadasValidated) => {

                setIsLoading(true);

                if (id === "new") {
                    SectorService
                        .create(dadasValidated)
                        .then((result) => {

                            setIsLoading(false);

                            if (result instanceof Error) {
                                alert(result.message);
                            } else {

                                if (isSaveAndClose()) {
                                    navigate("/sectors");
                                } else {
                                    navigate(`/sectors/details/${result}`);
                                };
                            };
                        });
                } else {

                    SectorService
                        .updateById(Number(id), { id: Number(id), ...dadasValidated })
                        .then((result) => {

                            setIsLoading(false);

                            if (result instanceof Error) {
                                alert(result.message);
                            } else {

                                if (isSaveAndClose()) {
                                    navigate("/sectors");
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
            SectorService.deleteById(id)
                .then(result => {
                    if (result instanceof Error) {
                        alert(result.message);
                    } else {
                        alert("Registro apagado com sucesso");
                        navigate('/sectors');
                    };
                });
        };
    };

    return (
        <LayoutBasePages
            title={"Cadastrar novo setor"}
            toobar={
                <DetailTools
                    textButtonNew="Novo"
                    showButtonSaveAndClose
                    showButtonSave={id !== "new"}
                    showButtonDelete={id !== "new"}

                    whenCilickingButtonBack={() => navigate("/sectors")}
                    whenCilickingButtonDelete={() => handleDelete(Number(id))}
                    whenCilickingButtonSave={save}
                    whenCilickingButtonNew={() => navigate("/sector/details/new")}
                    whenCilickingButtonSaveAndClose={saveAndClose}
                />
            }
        >

            <UForm placeholder={'Cadasto de setor'} ref={formRef} onSubmit={handleSave}>
                <Box m={1} display={"flex"} flexDirection={"column"} component={Paper} variant="outlined">

                    <Grid container direction={"column"} padding={2} spacing={2}>

                        {isLoading && (
                            <Grid item>
                                <LinearProgress variant="indeterminate" />
                            </Grid>
                        )}

                        <Grid item>
                            <Typography variant="h6">Formulário</Typography>
                        </Grid>

                        <Grid container item direction={"row"} spacing={2}>

                            <Grid item xs={12} md={6} lg={4} xl={2}>

                                <UTexField
                                    fullWidth
                                    disabled={isLoading}
                                    label="Nome do setor"
                                    placeholder="Digite o nome do setor"
                                    name="nomeSetor"
                                    value={name} 
                                    onChange={e => setName(e.target.value)} />

                            </Grid>
                        </Grid>

                    </Grid>
                </Box>
            </UForm>

        </LayoutBasePages>
    );
};