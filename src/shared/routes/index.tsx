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

import { useAppDrawerContext, useAuthContext } from "../contexts";
    
import { Dashboard, ListCollaborators, CollaboratorsDetails, ListSectors, SectorDetails, Reports, Ponto, Home } from "../../pages";


interface PrivateRouteProps {
    children: React.ReactNode;
    permissionType: number;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, permissionType }): React.ReactElement | null => {
    const { type_permission } = useAuthContext();

    const effectiveTypePermission = type_permission || parseInt(localStorage.getItem('TYPE_PERMISSION_USER') || '0', 10);

    return effectiveTypePermission === permissionType ? (children as React.ReactElement) : <Navigate to="/" />;
};

export const AppRoutes = () => {
    const { setDrawerOption } = useAppDrawerContext();
    // const { type_permission } = useAuthContext();
    const type_permission = parseInt(localStorage.getItem('TYPE_PERMISSION_USER')|| '0', 10)
    // type_permission 1 = usuário comum, type_permission 2 = usuário admin
    const TYPE_PERMISSION = 2;
    

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
            ...(type_permission === TYPE_PERMISSION ? [{
                icon: <AccountBalanceIcon />,
                path: "/sectors",
                label: "Cadastrar setores",
            }] : []),
            ...(type_permission === TYPE_PERMISSION ? [{
                icon: <PeopleIcon />,
                path: "/persons",
                label: "Cadastrar colaborador",
            }] : []),
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
    }, [setDrawerOption, type_permission]);
                                
    return (
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/" element={<Home />} />

            <Route path="/persons" element={
                <PrivateRoute permissionType={TYPE_PERMISSION}>
                    <ListCollaborators />
                </PrivateRoute>
            } />

            <Route path="/persons/details/:id" element={
                <PrivateRoute permissionType={TYPE_PERMISSION}>
                    <CollaboratorsDetails />
                </PrivateRoute>
            } />

            <Route path="/sectors" element={
                <PrivateRoute permissionType={TYPE_PERMISSION}>
                    <ListSectors />
                </PrivateRoute>
            } />
    
            <Route path="/sector/details/:id" element={
                <PrivateRoute permissionType={TYPE_PERMISSION}>
                    <SectorDetails />
                </PrivateRoute>
            } />

            <Route path="/reports" element={<Reports />} />

            <Route path="/point" element={<Ponto />} />

            <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
    );
};