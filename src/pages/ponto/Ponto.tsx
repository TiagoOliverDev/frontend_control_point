import { useEffect, useMemo, useState } from "react";


import { LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Pagination} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

import { DetailTools } from "../../shared/components";
import { LayoutBasePages } from "../../shared/layouts";

import { IListsPoint } from "../../@types/IListPoints"; 
import { useDebounce } from "../../shared/hooks";
import { Enviroment } from "../../shared/environment"; 
import { PointService } from "../../shared/services/api/point/PointService"; 
import { useAuthContext } from "../../shared/contexts";

interface IFormData {
    id_usuario: number | undefined;
    id_tipo_ponto: number;
};


export const Ponto = () => {
    const { id_user } = useAuthContext();

    // Estados iniciais definidos com base no armazenamento local ou valores padrão
    const [entrada, setEntrada] = useState<boolean>(() => JSON.parse(localStorage.getItem('entrada') || 'false'));
    const [btnRetorno, setBtnRetorno] = useState<boolean>(() => JSON.parse(localStorage.getItem('btnRetorno') || 'false'));
    const [btnEnter, setBtnEnter] = useState<boolean>(() => JSON.parse(localStorage.getItem('btnEnter') || 'true'));


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

    useEffect(() => {
        // Atualiza o localStorage quando os estados mudam
        localStorage.setItem('entrada', JSON.stringify(entrada));
        localStorage.setItem('btnRetorno', JSON.stringify(btnRetorno));
        localStorage.setItem('btnEnter', JSON.stringify(btnEnter));
    }, [entrada, btnRetorno, btnEnter]);
    

      useEffect(() => {

        setIsLoading(true);

        debounce(() => {
            PointService.getAll(id_user, page, busca)
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                        return;
                    } else {
                        setTotalCount(result.totalCount);
                        setRows(result.data);
                    };
                });
        });
    }, [busca, page]);


    const handleSave = (tipo_ponto: number) => {        
        try { 
            const dados: Omit<IFormData, "id"> = {
                id_usuario: id_user,
                id_tipo_ponto: tipo_ponto,
            };

            PointService.create(dados)
            .then(result => {
                if (result instanceof Error) {
                    console.error("Erro ao criar registro:", result);
                } else {
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


    const handleEntrada = () => {
        handleSave(1)
        window.location.reload();
        setBtnEnter(false)
        setEntrada(true)
    };

    const handlePauseAlmoco = () => {
        handleSave(2)
        window.location.reload();
        setBtnRetorno(true)
        setEntrada(false)
    };

    const handleSaidaEsporadica = () => {
        handleSave(4)
        window.location.reload();
        setBtnRetorno(true)
        setEntrada(false)
    };

    const handleFimExpediente = () => {
        handleSave(6)
        window.location.reload();
        setBtnEnter(true)
        setEntrada(false)
        setBtnRetorno(false)
    };

    
    const handleRetorno = () => {
        handleSave(7)
        window.location.reload();
        setEntrada(true)
        setBtnRetorno(false)
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

                    showButtonEnter={btnEnter}

                    showButtonPause={entrada}
                    showButtonPauseEsporadica={entrada}
                    showButtonRetorno={btnRetorno}
                    showButtonEndJourney={entrada}

                    whenCilickingButtonEnter={handleEntrada}
                    whenCilickingButtonPause={handlePauseAlmoco}
                    whenCilickingButtonPauseEsporadica={handleSaidaEsporadica}
                    whenCilickingButtonEndJourney={handleFimExpediente}
                    whenCilickingButtonRetorno={handleRetorno}
                    whenCilickingButtonBack={() => navigate("/")}
                />)} >
                
            <TableContainer component={Paper} variant="outlined" sx={{ mx: 1, width: "auto" }}>
                <Table>
                    <TableHead>

                        <TableRow>
                            <TableCell>Data / Hora</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Tipo do ponto</TableCell>
                        </TableRow>

                    </TableHead>
                    <TableBody>

                    {rows.map(row => (
                        <TableRow key={row.id}>
                            <TableCell>{row.dataHora}</TableCell>
                            <TableCell>{row.nome}</TableCell>
                            <TableCell>{row.tipoPonto}</TableCell>
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