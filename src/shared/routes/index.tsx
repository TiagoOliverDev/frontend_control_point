import { useEffect } from "react";

import { Routes, Route, Navigate } from "react-router-dom"

import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

import { useAppDrawerContext } from "../contexts";
    
import { Dashboard, ListCollaborators, CollaboratorsDetails, ListSectors, SectorDetails, Reports, Ponto } from "../../pages";

export const AppRoutes = () => {

    const { setDrawerOption } = useAppDrawerContext();

    useEffect(() => {
        
        setDrawerOption([
            {
                icon: <HomeIcon />,
                path: "/",
                label: "Página Inicial",
            },
            {
                icon: <AnalyticsIcon />,
                path: "/dashboard",
                label: "Dashboard",
            },
            {
                icon: <AccountBalanceIcon />,
                path: "/sectors",
                label: "Cadastrar setores",
            },
            {
                icon: <PeopleIcon />,
                path: "/collaborators",
                label: "Cadastrar colaborador",
            },
            {
                icon: <PendingActionsIcon />,
                path: "/point",
                label: "Ponto",
            }, 
            {
                icon: <DriveFileMoveIcon />,
                path: "/reports",
                label: "Relatórios",
            },    
      

        ]);
    }, [setDrawerOption]);
                                
    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/" element={<Dashboard />} />

            <Route path="/collaborators" element={<ListCollaborators />} />
            <Route path="/persons/details/:id" element={<CollaboratorsDetails />} />

            <Route path="/sectors" element={<ListSectors />} />
            <Route path="/sector/details/:id" element={<SectorDetails />} />

            <Route path="/reports" element={<Reports />} />

            <Route path="/point" element={<Ponto />} />

            <Route path="*" element={<Navigate to={"/login"} />} />
        </Routes>
    );
};