import { Card, CardContent, CardActions } from "@mui/material";
import React, { Component, useState } from "react";
import Typography from '@mui/material/Typography';
import { Button } from "@mui/material";


class Mesas extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bgColor: 'whitesmoke',
            nombreBoton: 'Seleccionar',
            contador: this.props.contador,
        };
    }

    componentDidMount() {
        if (this.state.contador % 2 == 0) {
            this.setState({ bgColor: '#64DD17', nombreBoton: 'Quitar' });
        }
        else {
            this.setState({ bgColor: 'whitesmoke', nombreBoton: 'Seleccionar' });
        }
    }

    pulsarBoton(event) {
        console.log("cambiar colores------------");
        this.setState({ contador: this.state.contador + 1 });
        console.log(this.state.contador);
        if (this.state.contador % 2 != 0) {
            this.setState({ bgColor: '#03FF19', nombreBoton: 'Quitar' });
            this.props.agregarMesas(this.props.clave);
        }
        else {
            this.setState({ bgColor: 'whitesmoke', nombreBoton: 'Seleccionar' });
            this.props.removerMesas(this.props.clave);
        }
    }

    render() {

        const { nombre, tipo, asientos, clave} = this.props;

        return (
            <Card key={clave} sx={{
                width: 150, minWidth: 130,
                m: 2, backgroundColor: this.state.bgColor,
                color: 'black'
            }} variant="outlined">
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography>
                        <b>{nombre}</b>
                    </Typography>
                    <Typography>
                        <b>Tipo: </b>{tipo}
                    </Typography>
                    <Typography>
                        <b>Asientos:</b>{asientos}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={this.pulsarBoton.bind(this)} >{this.state.nombreBoton}</Button>
                </CardActions>
            </Card>
        );
    }
}

export default Mesas;