import styled from '@emotion/styled';
import { Button, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import DatePickerIn from '../components/DatePicker';
import InputNumber from '../components/InputNumber';
import TableRestaurantSharpIcon from '@mui/icons-material/TableRestaurantSharp';
import React, { useState, useEffect, Component } from 'react';
import BasicTimePicker from '../components/TimePicker';
import { Container } from '@mui/system';
import Mesas from '../components/Mesas';
import { Link, withLocation } from 'react-router-dom';
import withRouter from '../components/withRouter';
import EditIcon from '@mui/icons-material/Edit';
import { withCookies, Cookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import Alerta from '../components/Notifications';

const urlMesas = "http://localhost:8080/api/mesas/";
const urlReservas = "http://localhost:8080/api/reservas";

const initialFValues = {
    fecha: "",
    hora: "",
    duracion: 0,
}

const StyledButton = styled(Button)({
    backgroundColor: '#F57F17',
    '&:hover': {
        backgroundColor: '#FFA726',
    }
});

class ReservaForm extends Component {

    emptyItem = {
        idRestaurante: 1,
        idUsuario: 1,
        fecha: new Date(),
        hora: new Date(),
        duracion: 0,
        reservaMesas: []
    };

    alertaEmpty = {
        isView: false,
        titulo: '',
        content: '',
        count: 0,
        tipo: ''
    }

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }
    
    constructor(props) {
        super(props);
        const { cookies } = props;
        this.state = {
            item: this.emptyItem,
            mesas: [],
            values: initialFValues,
            myCookie: cookies.get("my-token") || 'None',
            alerta: this.alertaEmpty,
            error:{}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeDateTimePicker = this.handleChangeDateTimePicker.bind(this);
        this.addTables = this.addTables.bind(this);
        this.removeTables = this.removeTables.bind(this);
    }

    async componentDidMount() {

        const response = await fetch(urlMesas);
        const body = await response.json();
        this.setState({ mesas: body });

        if(this.props.router.location.state!=null){
            const responseReserva = await fetch(urlReservas+"/"+this.props.router.location.state.reserva.id);
            const reserva = await responseReserva.json();
            this.setState({ item: reserva });
        }

    }

    async handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.myCookie);
        const { item } = this.state;
        item.idUsuario = this.state.myCookie.id;
        console.log(item);
        await fetch(urlReservas + (item.idReserva ? '/' + item.idReserva : ''), {
            method: (item.idReserva) ? 'PUT' : 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.state.myCookie.tokenAcceso}`,
            },
            body: JSON.stringify(item),
        }).then(resp => {
            console.log(resp);
            if(!resp.ok){
                return resp.json();
            }       
            else{
                return false;
            } 
        }).then(res =>{
            if(res){
                const property = Object.getOwnPropertyNames(res);
                this.setState({alerta: {isView: true, 
                    titulo:"Error",
                    content: res[property[0]],
                    count: ++this.state.alerta.count,
                    tipo: 'error'
                }});
            }
            else{
                this.setState({alerta: {isView: true, 
                    titulo:"Operación realizada con éxito",
                    content: "",
                    count: ++this.state.alerta.count,
                    tipo: 'success'
                }});
            }
        });
    }

    handleChange(event) {
        console.log("cambioooo!!!");
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = { ...this.state.item };
        item[name] = value;
        console.log(item);
        this.setState({ item });
    }

    handleChangeDateTimePicker(type, value) {
        let item = { ...this.state.item };
        item[type] = value;
        this.setState({ item });
        console.log(item);
    }

    addTables(id) {
        let item = { ...this.state.item };
        item.reservaMesas.push({ id: { idMesa: id } });
        this.setState({ item });
        console.log(item);
    }

    removeTables(id) {
        let item = { ...this.state.item };
        item.reservaMesas = item.reservaMesas.filter(item => item.id["idMesa"] !== id);
        this.setState({ item });
        console.log(item);
    }

    render() {
        let location = this.props.router.location;
        //console.log("---------LOCATION-----------");
        //console.log(location);
        let editReserva = location.state == null ? this.emptyItem : location.state.reserva;
    
        /*console.group("---ITEM CON DATOS DE LA LISTA DE RESERVAS---");
        console.log(this.state.item);
        console.groupEnd();*/

         return (
            <>
                <Alerta
                        alerta={this.state.alerta}
                />
                <form onSubmit={this.handleSubmit}>
                    <Container sx={{ display: 'flex', flexWrap: 'wrap', 
                    justifyContent: 'center' }}>
                        {this.state.mesas.map(mesa => {
                            return (
                                <Mesas key={mesa.idMesa} nombre={mesa.nombre}
                                    tipo={mesa.tipo}
                                    asientos={mesa.capacidad} clave={mesa.idMesa}
                                    agregarMesas={this.addTables}
                                    removerMesas={this.removeTables}
                                    contador={location.state == null ? 1 : 
                                        (editReserva.reservaMesas.some(m => m === mesa.nombre)) ? 2 : 1}
                                />
                            );
                        })}
                    </Container>
                    <Grid container justifyContent="center" 
                    alignItems="center" py={5} columnSpacing={3} rowSpacing={3}>
                        <Grid item>
                            <DatePickerIn label="Fecha" name="fecha" 
                            onChange={this.handleChangeDateTimePicker}
                            value={location.state == null ? '' : new Date(`${editReserva.fecha} ${editReserva.hora}`).getTime()}/>
                        </Grid>
                        <Grid item>
                            <BasicTimePicker label="Hora" name="hora" 
                            onChange={this.handleChangeDateTimePicker} 
                            value={location.state == null ? '' : new Date(`${editReserva.fecha} ${editReserva.hora}`).getTime()}    
                            />
                        </Grid>
                        <Grid item>
                            <InputNumber label="Duración" name="duracion" 
                            onChange={this.handleChange}
                            value={location.state == null ? 15 : editReserva.duracion}  />
                        </Grid>
                        <Grid item>
                            <StyledButton type="submit" size="large" 
                            variant="contained" 
                            endIcon={location.state == null ? <TableRestaurantSharpIcon /> : <EditIcon/>}>
                            {location.state == null ? "Reservar" : "Guardar cambios"}</StyledButton>
                        </Grid>
                    </Grid>
                </form>
            </>

        );
    }
}

export default withCookies(withRouter(ReservaForm));

