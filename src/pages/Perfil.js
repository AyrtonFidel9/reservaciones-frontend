import React from 'react';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import Paper from '@mui/material/Paper';
import { getUsuarioById } from '../services/usuario';
import { useCookies, Cookies } from "react-cookie";
import Avatar from '@mui/material/Avatar';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { updateUsuario } from '../services/usuario';
import Alerta from '../components/Notifications';

const MyAvatar = styled(Avatar)({
    width: '250px',
    height: '250px',
    fontSize: '80px',
});


function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}


const MiPerfil = () => {

    const cookie = new Cookies();
    const [cookies, setCookies] = useCookies(cookie);
    const [usuario, setUsuario] = React.useState({});
    const [readOnly, setReadOnly] = React.useState(true);
    const [nameButton, setNameButton] = React.useState({name: "Editar", count: 1});

    const alertaEmpty = {
        isView: false,
        titulo: '',
        content: '',
        count: 0,
        tipo: ''
    }

    const [alerta, setAlerta] = React.useState(alertaEmpty);

    React.useEffect(() => {
        getUsuarioById(cookies["my-token"])
            .then(res => setUsuario(res));
    }, [cookies["my-token"]]);

    const editEnable = () => {
        if(nameButton.count % 2 == 0){
            setNameButton({name: "Editar",count: ++nameButton.count});
            setReadOnly(true);
            updateUsuario(usuario, cookies["my-token"])
            .then(res => {
                if(res.ok){
                    setAlerta({isView: true, 
                        titulo:"Cambios realizados con exito BAY BAY",
                        content: "",
                        count: ++alerta.count,
                        tipo: 'success'
                    });
                    return false;
                }else{
                    return res.json();
                }
            })
            .then(resp => {
                if(resp){
                    const property = Object.getOwnPropertyNames(resp);
                    setAlerta({isView: true, 
                        titulo:"ERROR BAY BAY",
                        content: resp[property[0]],
                        count: ++alerta.count,
                        tipo: 'error'
                    });
                }
            });
        }
        else{
            setNameButton({name: "Guardar",count: ++nameButton.count});
            setReadOnly(false);
        }
    }

    return (
        <>
            <Paper sx={{
                backgroundColor: "whitesmoke",  
                margin: '0 auto',
                width: '60%',
                display: 'flex',
                flexWrap: 'wrap',
                alignSelf: 'center',
                padding: '30px 0',
            }} elevation={3}>
                <Alerta
                    alerta={alerta}
                />
                <Box sx={{
                    width: '100%',
                    textAlign: 'center',
                    marginBottom: '20px'
                }}>
                    <Typography variant="h4">Información del usuario</Typography>
                </Box>
                <Box sx={{
                    width: "100%",
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: "space-evenly",
                }}>
                    <Box sx={{
                        height: 'fit-content'
                    }}>
                        <MyAvatar
                            {...stringAvatar(usuario.nombre + " " + usuario.apellido)} />
                        <Box sx={{
                            display: 'grid',
                            justifyContent: 'center',
                            marginTop: '20px'
                        }}>
                            <Button variant="text" size="small">Restablecer contraseña</Button>
                        </Box>
                    </Box>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': {
                                m: 1, width: '25ch',
                            },
                            width: 'min-content',
                            height: 'fit-content'
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField sx={{
                            '& .MuiTextField-root': {
                                width: '35ch',
                            },
                        }}
                            id="nombre"
                            label="Nombre"
                            defaultValue="nombre"
                            InputProps={{
                                readOnly: readOnly,
                            }}
                            onChange={(event)=>{
                                let us = {...usuario};
                                console.log(us);
                                us.nombre = event.target.value; 
                                setUsuario(us);
                            }}
                            variant="standard"
                            value={usuario.nombre}
                        />
                        <TextField
                            id="apellido"
                            label="Apellido"
                            defaultValue="apellido"
                            InputProps={{
                                readOnly: readOnly,
                            }}
                            variant="standard"
                            onChange={(event)=>{
                                let us = {...usuario};
                                console.log(us);
                                us.apellido = event.target.value 
                                setUsuario(us);
                            }}
                            value={usuario.apellido}
                        />
                        <TextField
                            id="cedula"
                            label="Cédula"
                            defaultValue="cedula"
                            InputProps={{
                                readOnly: readOnly,
                            }}
                            onChange={(event)=>{
                                let us = {...usuario};
                                console.log(us);
                                us.cedula = event.target.value;
                                setUsuario(us);
                            }}
                            variant="standard"
                            value={usuario.cedula}
                        />
                        <TextField
                            id="email"
                            label="Correo electrónico"
                            defaultValue="email"
                            InputProps={{
                                readOnly: readOnly,
                            }}
                            onChange={(event)=>{
                                let us = {...usuario};
                                console.log(us);
                                us.email = event.target.value 
                                setUsuario(us);
                            }}
                            variant="standard"
                            value={usuario.email}
                        />
                        <Box sx={{
                            display: 'grid',
                            justifyContent: 'end',
                            marginTop: '20px'
                        }}>
                            <Button variant="contained"
                            onClick={editEnable}>
                            {nameButton.name}</Button>
                        </Box>
                    </Box>
                </Box>

            </Paper>
        </>
    );
}

export default MiPerfil;