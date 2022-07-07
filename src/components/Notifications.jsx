import React, { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';




const Alerta = (props) => {
    const { isView, titulo, content, count, tipo } = props.alerta;

    const [open, setOpen] = React.useState(isView);

    useEffect(() => { 
        setOpen(isView);
    }, [count]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert severity={tipo} onClose={handleClose}>
                <AlertTitle>{titulo}</AlertTitle>
                {content}
            </Alert>
        </Snackbar>
    );

}

export default Alerta;