import React, { useState, Component } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import styled from '@emotion/styled';
import LoginBack from '../img/restauranteLogin.jpg';
import InputPassword from '../components/InputPassword';
import InputUserN from '../components/InputUser';

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
        username: '',
        password: ''
    }

    constructor(props){
        super(props);
        this.state = {
            data: this.usuarioEmpty
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitData = this.submitData.bind(this);
    }

    handleChange = (name, value) =>{
        let item = {...this.state.data};
        item[name] = value;
        this.setState({data: item});
        //setData({[evt.target.name]: evt.target.value});
    }

    submitData = () =>{
        console.log(this.state.data);
    }

   
    
    render(){
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
                    <MyForm method="post">
                        <InputUserN onChange={this.handleChange} name="username"/>
                        <InputPassword onChange={this.handleChange} name="password"/>
                        <FormControl sx={{ marginTop: 5, width: '30ch' }}>
                            <Button sx={{ margin: '0 auto', width: '25ch' }} 
                            variant="outlined" onClick={()=>{
                                console.log(this.state.data);
                            }}
                            >Ingresar</Button>
                        </FormControl>
                    </MyForm>
                </Box>
            </MyDiv>
        );
    }
}

export default Login;