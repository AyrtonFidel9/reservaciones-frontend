import React from 'react';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import Paper from '@mui/material/Paper';
import getUsuarioById from '../services/usuario';
import { useCookies, Cookies } from "react-cookie";
import Avatar from '@mui/material/Avatar';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';

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

    React.useEffect(() => {
        getUsuarioById(cookies["my-token"])
            .then(res => setUsuario(res));
    }, [cookies["my-token"]]);

    console.log(usuario);

    return (
        <Paper sx={{
            backgroundColor: "whitesmoke",
            margin: '0 auto',
            width: '60%',
            display: 'flex',
            flexWrap: 'wrap',
            alignSelf: 'center',
            padding: '30px 0',
        }} elevation={3}>
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
                            readOnly: true,
                        }}
                        variant="standard"
                        value={usuario.nombre}
                    />
                    <TextField
                        id="apellido"
                        label="Apellido"
                        defaultValue="apellido"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                        value={usuario.apellido}
                    />
                    <TextField
                        id="cedula"
                        label="Cédula"
                        defaultValue="cedula"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                        value={usuario.cedula}
                    />
                    <TextField
                        id="email"
                        label="Correo electrónico"
                        defaultValue="email"
                        InputProps={{
                            readOnly: true,
                        }}
                        variant="standard"
                        value={usuario.email}
                    />
                    <Box sx={{
                        display: 'grid',
                        justifyContent: 'end',
                        marginTop: '20px'
                    }}>
                        <Button variant="contained">Editar</Button>
                    </Box>
                </Box>
            </Box>

        </Paper>
    );
}

export default MiPerfil;