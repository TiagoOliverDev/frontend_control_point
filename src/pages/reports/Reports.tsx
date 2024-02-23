import { useEffect, useState } from "react";

import { Box, Grid, Card, CardContent, Typography, Button, Icon } from "@mui/material";
import { UTexField } from "../../shared/components/forms"; 
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';

import { DetailTools } from "../../shared/components";
import { LayoutBasePages } from "../../shared/layouts";

import { CollaboratorService } from "../../shared/services/api/collaborator/CollaboratorService"; 
import { SectorService } from "../../shared/services/api/sector/SectorService"; 


export const Reports = () => {

    const [totalCountPersons, setTotalCountPersons] = useState(0);
    const [totalCountAcademy, setTotalCountAcademy] = useState(0);
    const [isLoadingAcademy, setIsLoadingAcademy] = useState(true);
    const [isLoadingPersons, setIsLoadingPersons] = useState(true);

    useEffect(() => {

        setIsLoadingAcademy(true);
        setIsLoadingPersons(true);

        SectorService.getAll(1)
            .then((result) => {
                setIsLoadingAcademy(false);

                if (result instanceof Error) {
                    alert(result.message);
                    return;
                } else {
                    setTotalCountAcademy(result.totalCount);
                };
            });

        CollaboratorService.getAll(1)
            .then((result) => {
                setIsLoadingPersons(false);

                if (result instanceof Error) {
                    alert(result.message);
                    return;
                } else {
                    setTotalCountPersons(result.totalCount);
                };
            });
    }, []);

    return (
        <LayoutBasePages
            title="Relatórios"
            toobar={(
                <DetailTools
                    showButtonNew={false}
                    showButtonDelete={false}
                    showButtonBack={false}
                    showButtonSave={false}
                />)} >
            <Box width={"100%"} display={"flex"} >
                <Grid container mx={1}>

                    <Grid item container spacing={2}>
                        <Grid item xs={12} md={6} lg={4} xl={3}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" align="center">
                                        Baixar histórico de ponto
                                    </Typography>
                                    <Box p={6} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                        {/* {isLoadingAcademy ? (
                                            <Typography variant="h5" align="center">
                                                Carregando...
                                            </Typography>
                                        ) : (
                                            <Typography variant="h1" align="center">
                                                {totalCountAcademy}
                                            </Typography>
                                        )} */}
                                    <Button
                                        style={{marginLeft: 25}}
                                        variant="contained"
                                        color="primary"
                                        disableElevation
                                        // onClick={whenCilickingButtonSave}
                                        startIcon={ <Icon> <DownloadIcon /> </Icon> }
                                    >
                                        <Typography variant="button" whiteSpace={"nowrap"} textOverflow={"ellipsis"} overflow={"hidden"}>
                                            Baixar
                                        </Typography>
                                    </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4} xl={3}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" align="center">
                                        Enviar histórico de ponto via email
                                    </Typography>
                                    <Box p={6} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                        {isLoadingPersons ? (
                                            <Typography variant="h5" align="center">
                                                Carregando...
                                            </Typography>
                                        ) : (
                                            <Typography variant="h1" align="center">
                                                {totalCountPersons}
                                            </Typography>
                                        )}
                                        {/* <UTexField
                                            fullWidth
                                            // disabled={isLoading}
                                            label="Digite seu email"
                                            name="nomeCompleto"
                                            // onChange={e => setName(e.target.value)} 
                                        /> */}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4} xl={3}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" align="center">
                                        Horas dentro
                                    </Typography>
                                    <Box p={6} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                        {isLoadingAcademy ? (
                                            <Typography variant="h5" align="center">
                                                Carregando...
                                            </Typography>
                                        ) : (
                                            <Typography variant="h1" align="center">
                                                {totalCountAcademy}
                                            </Typography>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={6} lg={4} xl={3}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" align="center">
                                        Horas devedoras
                                    </Typography>
                                    <Box p={6} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                        {isLoadingAcademy ? (
                                            <Typography variant="h5" align="center">
                                                Carregando...
                                            </Typography>
                                        ) : (
                                            <Typography variant="h1" align="center">
                                                {totalCountAcademy}
                                            </Typography>
                                        )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>

                    </Grid>
                </Grid>
            </Box>
        </LayoutBasePages>
    );
};