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
import withRouter from '../components/withRouter';

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

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            data: this.usuarioEmpty,
            token: {},
            userCookie: this.props.cookies.get("my-token") || ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitData = this.submitData.bind(this);
    }

    handleChange = (name, value) => {
        let item = { ...this.state.data };
        item[name] = value;
        this.setState({ data: item });
        //setData({[evt.target.name]: evt.target.value});
    }

    submitData = async (evt) => {
        evt.preventDefault();
        const user = await login(this.state.data);
        console.log(user);
        if(user.ok){
            const getToken = await user.json();
            this.setState({ token: getToken });
            this.props.cookies.set("my-token", getToken, {path: "/"});
            this.setState({userCookie: this.props.cookies.get("my-token")})
            this.props.router.navigate("/reserva");
        }
        else{
            alert("Credenciales incorrectas. Por favor, reviselas!")
        }

    }

    render() {
        
        return (
            <MyDiv>
                <Box sx={{
                    width: 380,
                    margin: '0 auto',
                    height: 430,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid #80808063',
                    borderRadius: '10px',
                    backgroundColor: '#fbf8f2',
                    boxShadow: '1px 2px 10px 1px black'
                }}>
                    <AccountCircleIcon sx={{ height: '4em', width: '4em' }} />
                    <MyForm onSubmit={this.submitData} method="post"
                    >
                        <InputUserN onChange={this.handleChange} name="usernameorEmail" />
                        <InputPassword onChange={this.handleChange} name="password" />
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