import { useEffect, useMemo, useState } from "react";


import { LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Pagination} from "@mui/material";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { DetailTools } from "../../shared/components";
import { LayoutBasePages } from "../../shared/layouts";

import { IListsPoint } from "../../@types/IListPoints"; 
import { useDebounce } from "../../shared/hooks";
import { Enviroment } from "../../shared/environment"; 
import { PointService } from "../../shared/services/api/point/PointService"; 

interface IFormData {
    idCollaborator: number;
    tipoCadastro: string;
    data: string,
    nomeCompleto: string;
    entrada: string;
    pausaAlmoco: string;
    retornoAlmoco: string;
    saidaEsporadica: string;
    retornoEsporadica: string;
    fimExpediente: string;
};



export const Ponto = () => {
    // const { id = "new" } = useParams<"id">();
    const [idEntrada, setIdEntrada] = useState<number>();

    const [searchParams, setSearchParams] = useSearchParams();
    const { debounce } = useDebounce();

    const [rows, setRows] = useState<IListsPoint[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    
    const navigate = useNavigate();

    const busca = useMemo(() => {
        return searchParams.get("busca") || "";
    }, [searchParams]);

    const page = useMemo(() => {
        return Number(searchParams.get("page") || "1");
    }, [searchParams]);
    

    const getCurrentDate = () => {
        const date = new Date();
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        return formattedDate
    };

    const getCurrentTime = () => {
        const now = new Date();
        const formattedTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
        return formattedTime
    };


      useEffect(() => {

        setIsLoading(true);

        debounce(() => {
            PointService.getAll(page, busca)
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


    const handleSave = () => {        
        try { 
            const dados: Omit<IListsPoint, "id"> = {
                idCollaborator: 4,
                tipoCadastro: "Comum",
                data: getCurrentDate(),
                nomeCompleto: 'Evento não iniciado',
                entrada: getCurrentTime(), 
                pausaAlmoco: 'Evento não iniciado',
                retornoAlmoco: 'Evento não iniciado',
                saidaEsporadica: 'Evento não iniciado',
                retornoEsporadica: 'Evento não iniciado',
                fimExpediente: 'Evento não iniciado'
            };

            PointService.create(dados)
            .then(result => {
                if (result instanceof Error) {
                    console.error("Erro ao criar registro:", result);
                } else {
                    setIdEntrada(result);
                    navigate("/point");
                    console.log("Registro criado com sucesso. ID:", result);
                }
            })
            .catch(error => {
                console.error("Erro ao criar registro:", error);
            });
          } catch (error) {
            console.error("Erro ao criar registro:", error);
        }
    };


    const handlePause = () => {
        // Fazer quando o back estiver pronto
        console.log('id: ', idEntrada)
    };



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
                    showButtonPauseEsporadica={true}

                    whenCilickingButtonEnter={handleSave}
                    whenCilickingButtonPause={handlePause}
                    whenCilickingButtonPauseEsporadica={handlePause}
                    whenCilickingButtonBack={() => navigate("/")}
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
                            <TableCell>{row.data}</TableCell>
                            <TableCell>{row.nomeCompleto}</TableCell>
                            <TableCell>{row.entrada}</TableCell>
                            <TableCell>{row.pausaAlmoco}</TableCell>
                            <TableCell>{row.retornoAlmoco}</TableCell>
                            <TableCell>{row.saidaEsporadica}</TableCell>
                            <TableCell>{row.retornoEsporadica}</TableCell>
                            <TableCell>{row.fimExpediente}</TableCell>
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