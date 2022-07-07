import React, { useState, Component } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styled from '@emotion/styled';
import LoginBack from '../img/restauranteLogin.jpg';
import InputPassword from '../components/InputPassword';
import InputUserN from '../components/InputUser';
import login from '../services/login';
import { withCookies, Cookies } from "react-cookie";
import { instanceOf } from 'prop-types';
import IconButton from '@mui/material/IconButton';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import withRouter from '../components/withRouter';
import Alerta from '../components/Notifications';
import parse from 'html-react-parser';

const MyDiv = styled('div')({
    width: '100vw',
    height: '100vh',
    display: 'grid',
    placeContent: 'center',
    backgroundImage: `url(${LoginBack})`,
    backgroundSize: 'cover'
});

const MyForm = styled('form')({
    width: "100%",
    display: "grid",
    placeContent: "center"
});

class Login extends Component {
    usuarioEmpty = {
        usernameorEmail: '',
        password: ''
    }
    
    alertaEmpty = {
        isView: false,
        titulo: '',
        content: '',
        count: 0,
        tipo: ''
    }

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    
    constructor(props) {
        super(props);
        this.state = {
            data: this.usuarioEmpty,
            token: {},
            userCookie: this.props.cookies.get("my-token") || "",
            errors:{},
            alerta: this.alertaEmpty
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitData = this.submitData.bind(this);
    }
    
    handleChange = (name, value) => {
        let item = { ...this.state.data };
        item[name] = value;
        this.setState({ data: item });
        this.validate(item);
        //console.log(this.state.errors);
        //setData({[evt.target.name]: evt.target.value});
    }
    
    validate = (data) =>{
        //debugger;
        let temp = {};
        temp.usernameorEmail = data.usernameorEmail == "" ? "Campo requerido":"";
        temp.password = data.password == "" ? "Campo requerido":"";
        this.setState({errors: {...temp}});
        //console.log(this.state.errors);
        return Object.values(temp).every(x => x == "");
    }

    submitData = async (evt) => {
        evt.preventDefault();
        const user = await login(this.state.data);
        console.log(user);
        if(user.ok){
            const getToken = await user.json();
            if(getToken.rol === "ROLE_CLIENTE"){
                this.setState({ token: getToken });
                this.props.cookies.set("my-token", getToken, {path: "/"});
                this.setState({userCookie: this.props.cookies.get("my-token")})
                this.props.router.navigate("/reserva");
            }
            else{
                this.setState({alerta: {isView: true, 
                    titulo:"Usuario no autorizado",
                    content: parse("Solo los usuarios con <strong>ROL CLIENTE</strong> puede acceder a este servicio"),
                    count: ++this.state.alerta.count,
                    tipo: 'info'
                }});
            //alert("");
            }
        }
        else{
            this.setState({alerta: {isView: true, 
                titulo:"Error al iniciar sesión",
                content: parse("<p>Por favor, <strong>credenciales incorrectas, </strong> reviselas</p>"),
                count: ++this.state.alerta.count,
                tipo: 'error'
            }});
            //alert("Credenciales incorrectas. Por favor, reviselas!")
        }

    }

    goToRecoveryPassword = () =>{
        console.log("IR A RECUPERAR CONTRASEÑA");
    }

    goToHome = () =>{
        this.props.router.navigate("/");
    }

    render() {
        return (
            <MyDiv>
                <Alerta
                    alerta={this.state.alerta}
                />
                <Box sx={{
                    width: 380,
                    margin: '0 auto',
                    paddingTop: '20px',
                    paddingBottom: '25px',
                    height: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #80808063',
                    borderRadius: '10px',
                    backgroundColor: '#fbf8f2',
                    boxShadow: '1px 2px 10px 1px black'
                }}>
                    <MyForm onSubmit={this.submitData} 
                        method="post"
                    >
                        <IconButton size="small" 
                            sx={{justifySelf: 'flex-start', 
                            marginBottom:'10px',
                            marginLeft: '-20px'}}
                            onClick={this.goToHome}>
                        <ArrowLeftIcon/>Regresar al Inicio</IconButton>
                        <AccountCircleIcon sx={{ height: '4em', width: '4em', 
                            justifySelf:'center' }} />
                        <InputUserN 
                            onChange={this.handleChange} 
                            error={this.state.errors.usernameorEmail}
                            name="usernameorEmail"/>
                        <InputPassword 
                            onChange={this.handleChange} 
                            name="password" 
                                error={this.state.errors.password}
                            />
                        <Button sx={{justifySelf:'left',
                        marginTop:'5px'}} size="small"
                        onClick={this.goToRecoveryPassword}
                        >¿Olvido su contraseña?</Button>
                        <FormControl sx={{ marginTop: 5, width: '30ch' }}>
                            <Button sx={{ margin: '0 auto', width: '25ch' }}
                                variant="outlined" type="submit"
                            >Ingresar</Button>
                        </FormControl>
                    </MyForm>
                </Box>
            </MyDiv>
        );
    }
}

export default withRouter(withCookies(Login));