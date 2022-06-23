import React, { Component } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const urlReserva = "http://localhost:8080/api/reservas";

const DeleteBtn = () =>{
    return(
        <IconButton aria-label="delete" size="large">
            <DeleteIcon fontSize="inherit" />
        </IconButton>
    );
} 

const EditBtn = () =>{
    return(
        <IconButton aria-label="edit" size="large">
            <EditIcon fontSize="inherit" />
        </IconButton>
    );
}

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'fecha', headerName: 'Fecha', width: 130 },
    { field: 'hora', headerName: 'Hora', width: 130 },
    { field: 'duracion', headerName: 'Duracion', type: 'number', width: 140 },
    {
        field: 'acciones',
        type: 'actions',
        headerName: 'Acciones',
        width: 200,
        cellClassName: 'actions',
        getActions: () => {  
          return [
            <EditBtn/>,<DeleteBtn/>
          ];
        }
    }
    /*{
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },*/
];



class ReservasList extends Component {

    state={
        reservas:[]
    }

    async componentDidMount(){
        const response = await fetch(urlReserva);
        const body = await response.json();
        this.setState({reservas: body.map(item =>{
            return {
                id: item.idReserva, 
                fecha: item.fecha, 
                hora: item.hora, 
                duracion: item.duracion
            }
        })});
        console.log(body);
        console.log(this.state.reservas);
    }

    render() {
        return (
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={this.state.reservas}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
        );

    }
}

export default ReservasList;