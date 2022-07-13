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
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import { useCookies, Cookies } from "react-cookie";
import { getUsuarioById } from '../services/usuario';
import { NavLink } from 'react-router-dom';



const settings = [
    {name: 'Perfil', link: 'mi-perfil'}, 
    {name: 'Salir', link: '/login'}
];

const MyNavLink = styled(NavLink)({
    textDecoration: 'none',
});

const ResponsiveAppBar = () => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const cookie = new Cookies();
    const [cookies, setCookies, removeCookie] = useCookies(cookie);
    const [usuario, setUsuario] = React.useState({});

    

    React.useEffect(()=>{
        getUsuarioById(cookies["my-token"])
            .then(res => setUsuario(res));
    },[cookies["my-token"]]);

    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };


    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }
    
    return (
        <AppBar position="static" color="inherit">
            <Toolbar>
                <Logo titulo="Restaurante" />
                <Box sx={{
                    textAlign: 'center',
                    float: 'right'
                }}>
                    <Button
                        variant="outlined"
                        href="/" sx={{ width: 200 }}
                    >
                        Ir al inicio
                    </Button>
                </Box>
                <Box sx={{ flexGrow: 0, marginLeft: '20px' }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar {...stringAvatar(usuario.nombre+" "+usuario.apellido)} />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {settings.map((setting) => (
                            <MyNavLink to={setting.link} key={setting.link}>
                                <MenuItem sx={{ width: '150px' }}
                                    key={setting.name}
                                    onClick={()=>{
                                        handleCloseUserMenu();
                                        if(setting.link==="/login"){
                                            removeCookie("my-token");                                            
                                        }                                        
                                    }}>
                                    <Typography textAlign="center">{setting.name}</Typography>
                                </MenuItem>
                            </MyNavLink>
                        ))}
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

const StyleDiv = styled('div', {})({
    display: 'flex',
    width: '100vw',
    minHeight: '90vh'
});

const Reserva = ({ children }) => {
    return (
        <>
            <ResponsiveAppBar />
            <StyleDiv>
                <LeftBar />
                <Outlet />
            </StyleDiv>
        </>
    );
}

export default Reserva;