import { Box, Button, Icon, Paper, useTheme, Divider, Skeleton, Typography, useMediaQuery, Theme } from "@mui/material";

import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import PauseIcon from '@mui/icons-material/Pause';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';

interface IDetailToolsProps {
    textButtonNew?: string;

    showButtonNew?: boolean;
    showButtonBack?: boolean;
    showButtonDelete?: boolean;
    showButtonSave?: boolean;
    showButtonSaveAndClose?: boolean;
    
    showButtonEnter?: boolean;
    showButtonPause?:  boolean;
    showButtonPauseEsporadica?:  boolean;
    showButtonEndJourney?: boolean;
    showButtonRetorno?:  boolean;

    showButtonNewLoading?: boolean;
    showButtonBackLoading?: boolean;
    showButtonDeleteLoading?: boolean;
    showButtonSaveLoading?: boolean;
    showButtonSaveAndCloseLoading?: boolean;

    showButtonEnterLoading?: boolean;
    showButtonPauseLoading?:  boolean;
    showButtonPauseEsporadicaLoading?:  boolean;
    showButtonEndJourneyLoading?: boolean;
    showButtonRetornoLoading?:  boolean;

    whenCilickingButtonNew?: () => void;
    whenCilickingButtonBack?: () => void;
    whenCilickingButtonDelete?: () => void;
    whenCilickingButtonSave?: () => void;
    whenCilickingButtonSaveAndClose?: () => void;
    whenCilickingButtonEnter?: () => void;
    whenCilickingButtonPause?: () => void;
    whenCilickingButtonPauseEsporadica?: () => void;
    whenCilickingButtonEndJourney?: () => void;
    whenCilickingButtonRetorno?: () => void;
};

export const DetailTools: React.FC<IDetailToolsProps> = ({
    textButtonNew = "Novo",

    showButtonSave = true,
    showButtonSaveAndClose = false,
    showButtonDelete = true,
    showButtonNew = true,
    showButtonBack = true,

    showButtonEnter = false,
    showButtonPause = false,
    showButtonPauseEsporadica = false,
    showButtonEndJourney = false,
    showButtonRetorno = false,
    
    showButtonSaveLoading = false,
    showButtonSaveAndCloseLoading = false,
    showButtonDeleteLoading = false,
    showButtonNewLoading = false,
    showButtonBackLoading = false,

    showButtonEnterLoading = false,
    showButtonPauseLoading = false,
    showButtonPauseEsporadicaLoading = false,
    showButtonEndJourneyLoading = false,
    showButtonRetornoLoading = false,

    whenCilickingButtonNew,
    whenCilickingButtonBack,
    whenCilickingButtonDelete,
    whenCilickingButtonSave,
    whenCilickingButtonSaveAndClose,
    
    whenCilickingButtonEnter,
    whenCilickingButtonPause,
    whenCilickingButtonPauseEsporadica,
    whenCilickingButtonEndJourney,
    whenCilickingButtonRetorno,

}) => {


    const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("sm"));
    const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down("md"));
    const theme = useTheme();

    return (
        <Box
            height={theme.spacing(5)}
            marginX={1}
            padding={1}
            paddingX={2}
            display={"flex"}
            gap={1}
            alignItems={"center"}
            component={Paper}
        >
            {(showButtonNew && !showButtonSaveLoading) && (
                <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    onClick={whenCilickingButtonSave}
                    startIcon={ <Icon> <SaveIcon /> </Icon> }
                >
                    <Typography variant="button" whiteSpace={"nowrap"} textOverflow={"ellipsis"} overflow={"hidden"}>
                        Salvar
                    </Typography>
                </Button>
            )}

            {showButtonSaveLoading && (
                <Skeleton width={109} height={60} />
            )}

            {(showButtonSaveAndClose && !showButtonSaveAndCloseLoading && !smDown && !mdDown) && (
                <Button
                    variant="outlined"
                    color="primary"
                    disableElevation
                    onClick={whenCilickingButtonSaveAndClose}
                    startIcon={ <Icon><SaveIcon /></Icon> }
                >
                    <Typography variant="button" whiteSpace={"nowrap"} textOverflow={"ellipsis"} overflow={"hidden"}>
                        Salvar e fechar
                    </Typography>
                </Button>
            )}

            {(showButtonSaveAndCloseLoading  && !smDown && !mdDown) && (
                <Skeleton width={180} height={60} />
            )}

            {(showButtonDelete && !showButtonDeleteLoading) && (
                <Button
                    variant="outlined"
                    color="primary"
                    disableElevation
                    onClick={whenCilickingButtonDelete}
                    startIcon={ <Icon><DeleteForeverIcon /></Icon> }
                >
                    <Typography variant="button" whiteSpace={"nowrap"} textOverflow={"ellipsis"} overflow={"hidden"}>
                        Apagar
                    </Typography>
                </Button>
            )}

            {showButtonDeleteLoading && (
                <Skeleton width={109} height={60} />
            )}

            {(showButtonSave && !showButtonNewLoading && !smDown) && (
                <Button
                    variant="outlined"
                    color="primary"
                    disableElevation
                    onClick={whenCilickingButtonNew}
                    startIcon={ <Icon><AddIcon /></Icon> }
                >
                    <Typography variant="button" whiteSpace={"nowrap"} textOverflow={"ellipsis"} overflow={"hidden"}>
                        {textButtonNew}
                    </Typography>
                </Button>
            )}

            {(showButtonNewLoading  && !smDown) && (
                <Skeleton width={109} height={60} />
            )}

            
            {(showButtonBack &&
                (showButtonNew || showButtonSaveAndClose || showButtonDelete || showButtonSave)
            ) && (
                <Divider orientation="vertical" />
            )}

            {(showButtonBack && !showButtonBackLoading) && (
                <Button
                    variant="outlined"
                    color="primary"
                    disableElevation
                    onClick={whenCilickingButtonBack}
                    startIcon={ <Icon><ArrowBackIcon /></Icon> }
                >
                    <Typography variant="button" whiteSpace={"nowrap"} textOverflow={"ellipsis"} overflow={"hidden"}>
                        Voltar
                    </Typography>
                </Button>
            )}

            {showButtonBackLoading && (
                <Skeleton width={109} height={60} />
            )}


            {(showButtonEnter && !showButtonEnterLoading) && (
                    <Button
                        variant="contained"
                        color="success"
                        disableElevation
                        onClick={whenCilickingButtonEnter}
                        startIcon={ <Icon> <CheckIcon /> </Icon> }
                    >
                        <Typography variant="button" whiteSpace={"nowrap"} textOverflow={"ellipsis"} overflow={"hidden"}>
                            Entrada
                        </Typography>
                    </Button>
            )}


            {(showButtonPause && !showButtonPauseLoading) && (
                    <Button
                        variant="contained"
                        color="info"
                        disableElevation
                        onClick={whenCilickingButtonPause}
                        startIcon={ <Icon> <RestaurantIcon /> </Icon> }
                    >
                        <Typography variant="button" whiteSpace={"nowrap"} textOverflow={"ellipsis"} overflow={"hidden"}>
                            Pausa almoço
                        </Typography>
                    </Button>
            )}


            {(showButtonPauseEsporadica && !showButtonPauseEsporadicaLoading) && (
                    <Button
                        variant="contained"
                        color="info"
                        disableElevation
                        onClick={whenCilickingButtonPauseEsporadica}
                        startIcon={ <Icon> <SelfImprovementIcon /> </Icon> }
                    >
                        <Typography variant="button" whiteSpace={"nowrap"} textOverflow={"ellipsis"} overflow={"hidden"}>
                            Saída esporádica
                        </Typography>
                    </Button>
            )}

            {(showButtonRetorno && !showButtonRetornoLoading) && (
                        <Button
                            variant="contained"
                            color="success"
                            disableElevation
                            onClick={whenCilickingButtonRetorno}
                            startIcon={ <Icon> <CheckIcon /> </Icon> }
                        >
                            <Typography variant="button" whiteSpace={"nowrap"} textOverflow={"ellipsis"} overflow={"hidden"}>
                                Retorno
                            </Typography>
                        </Button>
            )}


            {(showButtonEndJourney && !showButtonEndJourneyLoading) && (
                    <Button
                        variant="contained"
                        color="error"
                        disableElevation
                        onClick={whenCilickingButtonEndJourney}
                        startIcon={ <Icon> <DirectionsRunIcon /> </Icon> }
                    >
                        <Typography variant="button" whiteSpace={"nowrap"} textOverflow={"ellipsis"} overflow={"hidden"}>
                            Finalizar expediente
                        </Typography>
                    </Button>
            )}


        </Box>
    );
};