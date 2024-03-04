import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { Box, Grid, Card, CardContent, Typography } from "@mui/material";

import { DetailTools } from "../../shared/components";
import { LayoutBasePages } from "../../shared/layouts";

import { CollaboratorService } from "../../shared/services/api/collaborator/CollaboratorService"; 
import { StatusCollaboratorService } from "../../shared/services/api/statusCollaborator/StatusCollaboratorService";

export const Dashboard = () => {
    // Mostrar nessa página o total de colaboradores, colaboradores logados, quantidade de setores e quantidade de colaboradores em pausa.

    const [totalCountCollaboratorLogged, setTotalCountCollaboratorLogged] = useState(0);
    const [totalCountCollaboratorRegistered, setTotalCountCollaboratorRegistered] = useState(0);
    // criar states para setores cadastrados
    //
    const [isLoadingCollaborator, setIsLoadingCollaborator] = useState(true);
    const [isLoadingCollaboratorRegistered, setIsLoadingCollaboratorRegistered] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        
        setIsLoadingCollaborator(true);
        setIsLoadingCollaboratorRegistered(true);

        CollaboratorService.getAll(1) 
            .then((result) => {
                setIsLoadingCollaborator(false);

                if (result instanceof Error) {
                    alert(result.message);
                    return;
                } else {
                    setTotalCountCollaboratorRegistered(result.totalCount);
                };
            });

        CollaboratorService.getAll(1) //Alterar o service para o StatusCollaboratorService ou outro
            .then((result) => {
                setIsLoadingCollaboratorRegistered(false);

                if (result instanceof Error) {
                    alert(result.message);
                    return;
                } else {
                    setTotalCountCollaboratorLogged(result.totalCount);
                };
            });
    }, []);

    return (
        <LayoutBasePages
            title="Dashboard"
            toobar={(
                <DetailTools
                    showButtonNew={false}
                    showButtonDelete={false}
                    showButtonBack={true}
                    showButtonSave={false}

                    whenCilickingButtonBack={() => navigate("/")}
                />)} >
            <Box width={"100%"} display={"flex"} >
                <Grid container mx={1}>

                    <Grid item container spacing={2}>
                        <Grid item xs={12} md={6} lg={4} xl={3}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h5" align="center">
                                        Total de colaboradores logados
                                    </Typography>
                                    <Box p={6} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                        {isLoadingCollaborator ? (
                                            <Typography variant="h5" align="center">
                                                Carregando...
                                            </Typography>
                                        ) : (
                                            <Typography variant="h1" align="center">
                                                {totalCountCollaboratorRegistered}
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
                                        Total de colaboradores cadastrados
                                    </Typography>
                                    <Box p={6} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                        {isLoadingCollaboratorRegistered ? (
                                            <Typography variant="h5" align="center">
                                                Carregando...
                                            </Typography>
                                        ) : (
                                            <Typography variant="h1" align="center">
                                                {totalCountCollaboratorLogged}
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