import { useEffect, useState } from "react";

import { Box, Grid, Card, CardContent, Typography } from "@mui/material";

import { DetailTools } from "../../shared/components";
import { LayoutBasePages } from "../../shared/layouts";

import { CollaboratorService } from "../../shared/services/api/collaborator/CollaboratorService"; 
import { StatusCollaboratorService } from "../../shared/services/api/statusCollaborator/StatusCollaboratorService";

export const Home = () => {
    // Mostrar nessa página o total de colaboradores, colaboradores logados, quantidade de setores e quantidade de colaboradores em pausa.


    return (
        <LayoutBasePages
            title="Gestor de pontos"
            toobar={(
                <DetailTools
                    showButtonNew={false}
                    showButtonDelete={false}
                    showButtonBack={false}
                    showButtonSave={false}
                />)} >
            <Box width={"100%"} display={"flex"} >
                <Grid container justifyContent="center">
                    <Grid item container spacing={2} xs={12} md={6} lg={4} xl={3}>
                        <Grid item xs={12}>
                            <Typography variant="h5" align="center">
                                Seja bem vindo ao Gestor de ponto!
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </LayoutBasePages>
    );
};