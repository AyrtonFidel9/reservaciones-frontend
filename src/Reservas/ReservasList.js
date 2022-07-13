import React, { Component } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Container } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import { NavLink, Link } from 'react-router-dom';
import { withCookies, Cookies, useCookies } from 'react-cookie';
import { instanceOf } from 'prop-types';
import Alerta from '../components/Notifications';

const urlReserva = "http://localhost:8080/api/reservas";

const DeleteBtn = (props) => {
    return (
        <IconButton aria-label="delete" size="large"
            onClick={props.click}>
            <DeleteIcon fontSize="inherit" />
        </IconButton>
    );

}

const EditBtn = (props) => {
    return (
        <Link to="/reserva" state={{ reserva: props.reservas }}>
            <IconButton aria-label="edit" size="large">
                <EditIcon fontSize="inherit" />
            </IconButton>
        </Link>
    );
}

class ReservasList extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    }

    alertaEmpty = {
        isView: false,
        titulo: '',
        content: '',
        count: 0,
        tipo: ''
    }

    constructor(props) {
        super(props);
        const { cookies } = props;
        this.state = {
            reservas: [],
            myCookie: cookies.get("my-token") || 'None',
            alerta: this.alertaEmpty,
            update: false,
        }
    }

    columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'fecha', headerName: 'Fecha', width: 130 },
        { field: 'hora', headerName: 'Hora', width: 130 },
        { field: 'duracion', headerName: 'Duración (min)', type: 'number', width: 140 },
        { field: 'reservaMesas', headerName: 'Mesas', type: 'array', width: 350 },
        {
            field: 'acciones',
            type: 'actions',
            headerName: 'Acciones',
            width: 200,
            cellClassName: 'actions',
            renderCell: (params) => {
                let fecha = params.row.fecha;
                let today = new Date().toLocaleDateString("en-CA");
                if(fecha >= today){
                    return [
                        <EditBtn key={params.row.id} reservas={params.row} />,
                        <DeleteBtn key={params.row.id * 2}
                            click={(e) => {
                                const respuesta = fetch(urlReserva + "/" + params.row.id, {
                                    method: 'DELETE',
                                    headers: {
                                        'Accept': 'application/json',
                                        'Content-Type': 'application/json',
                                        'Authorization': `Bearer ${this.state.myCookie.tokenAcceso}`,
                                    },
                                });
                                respuesta.then(res => {
                                    if (res.ok) {
                                        this.setState({
                                            alerta: {
                                                isView: true,
                                                titulo: "Reservacion eliminada con éxito",
                                                content: "",
                                                count: ++this.state.alerta.count,
                                                tipo: 'success'
                                            }
                                        });
                                        const interval = setInterval(() => {
                                            window.location.reload();
                                        }, 3000);
    
                                    }
                                    else {
                                        this.setState({
                                            alerta: {
                                                alerta: {
                                                    isView: true,
                                                    titulo: "Error",
                                                    content: "Ha existido un error al eliminar la reservación",
                                                    count: ++this.state.alerta.count,
                                                    tipo: 'error'
                                                }
                                            }
                                        });
                                    }
                                });
    
                            }} />
            
                    ];

                }
            }
        }
    ];

    async componentDidMount() {
        const response = await fetch(urlReserva + "/usuario/" + this.state.myCookie.id);
        const body = await response.json();
        this.setState({
            reservas: body.map(item => {
                return {
                    id: item.idReserva,
                    fecha: item.fecha,
                    hora: item.hora,
                    duracion: item.duracion,
                    reservaMesas: item.reservaMesas.map(mesa => {
                        return mesa.mesa.nombre;
                    })
                }
            })
        });
        console.log(body);
    }

    render() {
        //console.log(this.state.reservas);
        return (
            <>
                <Alerta
                    alerta={this.state.alerta}
                />
                <div style={{ height: '70vh', width: '78%', margin: '0 auto' }}>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        height: '13vh',
                        alignItems: 'center'
                    }}>
                        <NavLink to="/reserva">
                            <Button startIcon={<AddIcon />}
                                variant="contained">Nueva reserva</Button>
                        </NavLink>
                    </Box>
                    <DataGrid
                        rows={this.state.reservas}
                        columns={this.columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        loading={this.state.reservas.length === 0}
                    />
                </div>
            </>
        );

    }
}

export default withCookies(ReservasList);