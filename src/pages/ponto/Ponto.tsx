import { useEffect, useState } from "react";

import { Box, Grid, Card, CardContent, Typography, Paper, LinearProgress } from "@mui/material";

import { DetailTools } from "../../shared/components";
import { LayoutBasePages } from "../../shared/layouts";

import { UTexField, UForm } from "../../shared/components/forms"; 

export const Ponto = () => {


    return (
        <LayoutBasePages
            title="Registro de ponto"
            toobar={(
                <DetailTools
                    showButtonNew={false}
                    showButtonDelete={false}
                    showButtonBack={false}
                    showButtonSave={false}
                />)} >

                <>
                </>
        </LayoutBasePages>
    );
};