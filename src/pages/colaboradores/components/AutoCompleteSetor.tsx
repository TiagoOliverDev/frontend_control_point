import { useEffect, useState, useMemo } from "react";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";

import { SectorService } from "../../../shared/services/api/sector/SectorService"; 
import { useDebounce } from "../../../shared/hooks";
import { useField } from "@unform/core";

type TAutoCompleteSetor = {
    id: number;
    label: string;
};

interface IAutoCompleteSetorProps {
    isExternalLoading: boolean;
};

export const AutoCompleteSetor: React.FC<IAutoCompleteSetorProps> = ({ isExternalLoading = false }) => {
    const { fieldName, registerField, defaultValue, clearError, error } = useField("setor");
    const { debounce } = useDebounce();

    const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue);

    const [options, setOptions] = useState<TAutoCompleteSetor[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [busca, setBusca] = useState("");

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => selectedId,
            setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
        });
    }, [registerField, fieldName, selectedId]);

    useEffect(() => {

        setIsLoading(true);

        debounce(() => {
            SectorService.getAll(1, busca)
                .then((result) => {
                    setIsLoading(false);

                    if (result instanceof Error) {
                        alert(result.message);
                        return;
                    } else {
                        console.log('auto complete', result.data);

                        setOptions(result.data.map(setor => ({ id: setor.id, label: setor.nomeSetor })));
                    };
                });
        });
    }, [busca]);

    const autCompleteSelectedOption = useMemo(() => {
        if (!selectedId) return null;

        const selectedOption = options.find(option => option.id === selectedId);

        return selectedOption;

    }, [selectedId, options]);

    return (
        <Autocomplete
            openText="Abrir"
            closeText="Fechar"
            noOptionsText="Sem opções"
            loadingText="Buscando..."

            disablePortal

            options={options}
            loading={isLoading}
            disabled={isExternalLoading}
            value={autCompleteSelectedOption}
            onInputChange={(_, newValue) => setBusca(newValue)}
            popupIcon={isExternalLoading || isLoading ? <CircularProgress size={28} /> : undefined}
            onChange={(_, newValue) => { setSelectedId(newValue?.id); setBusca(""); clearError(); }}
            renderInput={(params) => (
                <TextField
                    {...params}

                    error={!!error}
                    helperText={error}

                    label="Setor"
                />
            )}
        />
    );
};