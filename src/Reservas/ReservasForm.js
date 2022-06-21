import styled from '@emotion/styled';
import { Button, Grid} from '@mui/material';
import TextField from '@mui/material/TextField';
import DatePickerIn from '../components/DatePicker';
import InputNumber from '../components/InputNumber';
import TableRestaurantSharpIcon from '@mui/icons-material/TableRestaurantSharp';
import React, { useState, useEffect } from 'react';
import BasicTimePicker from '../components/TimePicker';
import { Container } from '@mui/system';
import Mesas from '../components/Mesas';

const urlMesas = "http://localhost:8080/api/mesas/";


const initialFValues = {
    fecha: new Date(),
    hora: new Date(),
    duracion: 0,
}

const StyledButton = styled(Button)({
    backgroundColor: '#F57F17',
    '&:hover': {
        backgroundColor: '#FFA726',
      }
}); 

async function componentDidMount(){
    const response = await fetch(urlMesas);
    const body = await response.json();
    //console.log(body);
    return body;
}

const ReservaForm = () =>  {
    const [mesas, setMesas] = useState([]);

    const [values, setValues] = useState(initialFValues);

    componentDidMount().then(resp =>{
        //console.log(resp);
        setMesas(resp);
    })


    return (
        <form>
            <Container sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                {mesas.map(mesa => {
                    return(
                        <Mesas key={mesa.idMesa} nombre={mesa.nombre} 
                        tipo={mesa.tipo} 
                        asientos={mesa.capacidad} clave={mesa.idMesa}/>
                    );
                })}
            </Container>
            <Grid container justifyContent="center" alignItems="center" py={5} columnSpacing={3} rowSpacing={3}>
                <Grid item>
                    <DatePickerIn label="Fecha" name="fecha"/>
                </Grid>
                <Grid item>
                    <BasicTimePicker  label="Hora" name="hora"/>
                </Grid>
                <Grid item>
                    <InputNumber label="Duración" name="duracion"/>
                </Grid>
                <Grid item>
                    <StyledButton size="large" variant="contained" endIcon={<TableRestaurantSharpIcon />}>Reservar</StyledButton>
                </Grid>
            </Grid>
        </form>

    );
}

export default ReservaForm;