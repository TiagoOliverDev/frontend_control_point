import { useEffect, useMemo, useState } from "react";


import { LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Pagination, IconButton } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

import { DetailTools } from "../../shared/components";
import { LayoutBasePages } from "../../shared/layouts";

import { UTexField, UForm } from "../../shared/components/forms"; 
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import { IListCollaborators } from "../../@types/IListCollaborators";
import { useDebounce } from "../../shared/hooks";
import { Enviroment } from "../../shared/environment"; 
import { CollaboratorService } from "../../shared/services/api/collaborator/CollaboratorService"; 
import * as yup from "yup";

interface IFormData {
    data: string,
    nomeCompleto: string;
    entrada: string;
    pausaAlmoco: string;
    retornoAlmoco: string;
    saidaEsporadica: string;
    retornoEsporadica: string;
    fimExpediente: string;
};

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
    data: yup.string().required(),
    nomeCompleto: yup.string().required(),
    entrada: yup.string().required(),
    pausaAlmoco: yup.string().required(),
    retornoAlmoco: yup.string().required(),
    saidaEsporadica: yup.string().required(),
    retornoEsporadica: yup.string().required(),
    fimExpediente: yup.string().required(),
});


export const Ponto = () => {

    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce();

    const [rows, setRows] = useState<IListCollaborators[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const navigate = useNavigate()

    const busca = useMemo(() => {
        return searchParams.get("busca") || "";
    }, [searchParams]);

    const page = useMemo(() => {
        return Number(searchParams.get("page") || "1");
    }, [searchParams]);

    useEffect(() => {

        setIsLoading(true);

        debounce(() => {
            CollaboratorService.getAll(page, busca)
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                        return;
                    } else {
                        console.log(result);

                        setTotalCount(result.totalCount);
                        setRows(result.data);
                    };
                });
        });
    }, [busca, page]);

    return (
        <LayoutBasePages
            title="Registro de ponto"
            toobar={(
                <DetailTools
                    showButtonNew={false}
                    showButtonDelete={false}
                    showButtonBack={true}
                    showButtonSave={false}
                    showButtonEnter={true}
                    showButtonPause={true}
                    showButtonEndJourney={true}
                />)} >
                
                <TableContainer component={Paper} variant="outlined" sx={{ mx: 1, width: "auto" }}>
                <Table>
                    <TableHead>

                        <TableRow>
                            <TableCell>Data</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Entrada</TableCell>
                            <TableCell>Pausa almoço</TableCell>
                            <TableCell>Retorno da p/almoço</TableCell>
                            <TableCell>Saída esporádica</TableCell>
                            <TableCell>Retorno da s/esporádica</TableCell>
                            <TableCell>Fim do expediente</TableCell>
                        </TableRow>

                    </TableHead>
                    <TableBody>

                    {rows.map(row => (
                        <TableRow key={row.id}>
                            <TableCell>{row.nomeCompleto}</TableCell>
                            <TableCell>{row.nomeCompleto}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.matricula}</TableCell>
                            <TableCell>{row.turno}</TableCell>
                            <TableCell>{row.setor}</TableCell>
                            <TableCell>
                                <IconButton size="small">
                                    <DeleteForeverIcon />
                                </IconButton>
                                <IconButton size="small" >
                                    <EditIcon />
                                </IconButton>
                            </TableCell>
                            <TableCell>{row.setor}</TableCell>
                        </TableRow>
                    ))}

                    </TableBody>

                    {totalCount === 0 && !isLoading && (
                        <caption>{Enviroment.LISTAGEM_VAZIA}</caption>
                    )}

                    <TableFooter>
                        {isLoading && (
                            <TableCell colSpan={3}><LinearProgress variant="indeterminate" /></TableCell>
                        )}
                                    
                        {(totalCount > 0) && totalCount > Enviroment.LIMITE_DE_LINHAS && !isLoading && (
                            <TableCell colSpan={3}>
                                <Pagination
                                    variant="outlined"
                                    count={Math.ceil(totalCount / Enviroment.LIMITE_DE_LINHAS)}
                                    page={page}
                                    onChange={(_, newPage) => setSearchParams({ busca, page: newPage.toString() }, { replace: true })}
                                />
                            </TableCell>
                        )}
                    </TableFooter>
                </Table>
            </TableContainer>
        </LayoutBasePages>
    );
};