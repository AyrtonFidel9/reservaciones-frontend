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




const ResponsiveAppBar = () => {
    return (
        <AppBar position="static" color="inherit">
            <Toolbar>
                <Grid container spacing={2}>
                    <Grid item>
                        <RestaurantIcon/>
                    </Grid>
                    <Grid item >
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            LOGO
                        </Typography>
                    </Grid>
                </Grid>
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


const Reserva = () =>{
    return (
        <div>
            <ResponsiveAppBar/>
            <IngresarReserva/>
            
        </div>
    
    );
}

export default Reserva;