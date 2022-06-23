import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Grid from '@mui/material/Grid';
import IngresarReserva from './IngresarReserva';
//import UseFormControl from '../components/Input';
import Logo from '../components/LogoHeader';
import LeftBar from '../components/LeftBar';
import { Container } from '@mui/system';
import { RoofingTwoTone } from '@mui/icons-material';
import styled from '@emotion/styled';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Router } from 'react-router-dom';
import ReservasList from '../Reservas/ReservasList';
import Inicio from './Inicio';
import { Outlet } from 'react-router-dom';

const ResponsiveAppBar = () => {
    return (
        <AppBar position="static" color="inherit">
            <Toolbar>
                <Logo titulo="Restaurante"/>
                <Box sx={{
                    textAlign: 'center', 
                    float: 'right' }}>
                    <Button
                    variant="outlined"  
                    href="/" sx={{width: 200}}
                    >
                        Ir al inicio
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

const StyleDiv = styled('div',{})({
    display: 'flex',
    width: '100vw',
    height: '100vh'
});

const Reserva = ({children}) =>{
    return (
        <>
            <ResponsiveAppBar/>
            <StyleDiv>
                <LeftBar/>
                <Outlet/>
            </StyleDiv>   
        </>
    );
}

export default Reserva;