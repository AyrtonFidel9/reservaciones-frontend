import React from 'react';
import ReservaForm from '../Reservas/ReservasForm';
import Paper from '@mui/material/Paper';
import styled from '@emotion/styled';
import { yellow } from '@mui/material/colors';

const StyledPaper = styled(Paper, {})({
    width: '60%',
    height: 'auto',
    margin: '25px auto'
});



const IngresarReserva = () =>{
    return (
        <StyledPaper>
            <ReservaForm />
        </StyledPaper>
    );
}

export default IngresarReserva;