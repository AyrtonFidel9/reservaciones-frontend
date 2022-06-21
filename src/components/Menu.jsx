import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Grid from '@mui/material/Grid';




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
                    href="#" sx={{width: 200}}
                    >
                        Hacer reservacion
                    </Button>
                </Box>
                
            </Toolbar>
        </AppBar>
    );
}

export default ResponsiveAppBar;
