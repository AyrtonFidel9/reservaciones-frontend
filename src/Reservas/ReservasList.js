import React, { Component } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Container } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import { NavLink, Link } from 'react-router-dom';


const urlReserva = "http://localhost:8080/api/reservas";

const DeleteBtn = () => {
    return (
        <IconButton aria-label="delete" size="large">
            <DeleteIcon fontSize="inherit" />
        </IconButton>
    );
}

const EditBtn = (props) => {
    return (
        <Link to="/reserva" state={{ reserva: props.reservas}}>
            <IconButton aria-label="edit" size="large">
                <EditIcon fontSize="inherit" />
            </IconButton>
        </Link>
    );
}





class ReservasList extends Component {

    state = {
        reservas: []    
    }


    columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'fecha', headerName: 'Fecha', width: 130 },
        { field: 'hora', headerName: 'Hora', width: 130 },
        { field: 'duracion', headerName: 'Duración', type: 'number', width: 140 },
        { field: 'reservaMesas', headerName: 'Mesas', type: 'array', width: 350 },
        {
            field: 'acciones',
            type: 'actions',
            headerName: 'Acciones',
            width: 200,
            cellClassName: 'actions',
            renderCell: (params) => {
                return [
                    <EditBtn key={params.row.id} reservas={params.row}/>,
                    <DeleteBtn key={params.row.id*2}/>
                ];
            }
        }
    ];

    async componentDidMount() {
        const response = await fetch(urlReserva);
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
        console.log(this.state.reservas);
        return (
            <div style={{ height: '70vh', width: '78%', margin: '0 auto' }}>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    height: '13vh',
                    alignItems: 'center'
                }}>
                    <NavLink to="/reserva">
                        <Button startIcon={<AddIcon />} variant="contained">Nueva reserva</Button>
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
        );

    }
}

export default ReservasList;