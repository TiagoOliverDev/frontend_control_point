import { useEffect, useState } from "react";

import { Box, Grid, Card, CardContent, Typography, Button, Icon } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';

import { DetailTools } from "../../shared/components";
import { LayoutBasePages } from "../../shared/layouts";

import { ReportsService } from "../../shared/services/api/reports/ReportsService";
import { useAuthContext } from "../../shared/contexts";

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface IListsPoint {
    id: number | undefined | null | '';
    id_usuario: number | undefined;
    id_tipo_ponto: number;
    nome: string | undefined;
    tipoPonto: string | undefined;
    dataHora: string;
};


export const Reports = () => {

    const { id_user } = useAuthContext()

    const [rows, setRows] = useState<IListsPoint[]>([]);
    const [isLoadingPersons, setIsLoadingPersons] = useState(true);

    useEffect(() => {
        ReportsService.getHistoryById(id_user)
            .then((result) => {
                setIsLoadingPersons(false);

                if (result instanceof Error) {
                    alert(result.message);
                    return;
                } else {
                    setRows(result.data)
                };
        });
    }, []);


    const generateHistoryPoint = () => {
        
        if (rows.length === 0) {
            alert("Não há dados para gerar o PDF.");
            return;
        }
    
        const doc = new jsPDF();
        const tableColumn = ["Data e Hora", "Nome", "Tipo de Ponto"];
        const tableRows: any = [];
    
        rows.forEach(point => {
            const pointData = [
                point.dataHora,
                point.nome,
                point.tipoPonto
            ];
            tableRows.push(pointData);
        });
    
        autoTable(doc, { head: [tableColumn], body: tableRows });
        doc.save("historico_pontos.pdf");
    }

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
                                    <Button
                                        style={{marginLeft: 25}}
                                        variant="contained"
                                        color="primary"
                                        disableElevation
                                        onClick={generateHistoryPoint}
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
                    </Grid>                                
                </Grid>
            </Box>
        </LayoutBasePages>
    );
};