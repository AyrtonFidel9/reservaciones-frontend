import React , { Component } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

const urlMenu = "http://localhost:8080/api/menus/";
const urlAlimento = "http://localhost:8080/api/alimentos/";

class Alimentos extends Component {
    state={
        data:[]
    }

    async componentDidMount(){
        const response = await fetch(urlAlimento+"byMenu/"+this.props.idMenu);
        const body = await response.json();
        this.setState({data: body});
        console.log(body);
    }

    render (){

        if(this.state.data.length != 0){
            return(
                this.state.data.map(alimento => {
                    return(
                        <Card sx={{width: 330, minWidth: 300,
                        m: 2, background: 'rgb(56,56,56)',
                        background: 'linear-gradient(162deg, rgba(56,56,56,1) 0%, rgba(38,38,38,1) 50%, rgba(0,0,0,1) 100%)', 
                        color: 'white'}}  variant="outlined" key={alimento.id}>
                            <CardMedia
                            component="img"
                            height="120"
                            src={"data:image/jpg;base64,"+alimento.imagen}
                            alt="imagen alimento"
                            />
                            <CardContent>
                                <Typography>
                                    <b>Plato: </b>{alimento.nombre}
                                </Typography>
                                <Typography>
                                    <b>Precio: </b>$ {alimento.precio}
                                </Typography>
                                <Typography>
                                    <b>Descripcion</b>
                                </Typography>
                                <Typography variant='body1'>
                                    {alimento.descripcion}
                                </Typography>
                            </CardContent>
                        </Card>
                    );
                })
            );
        }
        else{
            return(
                <p>Alimentos no disponibles, por el momento</p>
            );
        }
            
    
    }
        
    
}


class Comida extends Component  {

    state={
        data:[]
    }


    async componentDidMount(){
        const response = await fetch(urlMenu);
        const body = await response.json();
        this.setState({data: body});
        console.log(body);
    }

    render(){
                            
        return (
            this.state.data.map(menu=>{
                return (
                    <Box key={menu.id} 
                        sx={{ marginTop: 5, paddingBottom: 5,
                        width: '100vw', height: "auto", display: 'grid', justifyItems: 'center'  }}>
                        <Typography variant="h4" sx={{
                            fontWeight: 'bold'
                        }}>{menu.nombre}</Typography>
                        <Box key={menu.id*2}  sx={{mx: 'auto', width: "100%", paddingTop: 3}} display="flex"
                            flexWrap="wrap"
                            alignItems='center'
                            justifyContent='center'>
                            <Alimentos  key={menu.id*3}  idMenu={menu.id}></Alimentos>
                        </Box>
                    </Box>
                )
            })
        );
    }
}

export default Comida;