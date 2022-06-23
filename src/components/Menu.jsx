import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Logo from './LogoHeader';

const ResponsiveAppBar = () => {
    return (
        <AppBar position="static" color="inherit">
            <Toolbar>
                <Logo titulo="Restaurante"/>
                <Box sx={{
                    textAlign: 'center', 
                    float: 'right' }}>
                    <Button
                    variant="text"  
                    href="#comida" sx={{width: 'auto', marginRight: 5}}
                    >
                        Menú
                    </Button>
                </Box>
                <Box sx={{
                    textAlign: 'center', 
                    float: 'right' }}>
                    <Button
                    variant="outlined"  
                    href="/reserva" sx={{width: 200}}
                    >
                        Hacer reservacion
                    </Button>
                </Box>
                
            </Toolbar>
        </AppBar>
    );
}

export default ResponsiveAppBar;
