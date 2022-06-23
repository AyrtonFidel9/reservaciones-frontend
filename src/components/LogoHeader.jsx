import React from 'react';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';


const Logo = (props) => {
    console.log(props.titulo);
    return(
        <>
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
                            fontWeight: 700,
                            letterSpacing: '1px',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        {props.titulo}
                    </Typography>
                </Grid>
            </Grid>
        </>
    );
}

export default Logo;