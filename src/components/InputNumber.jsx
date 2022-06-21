import * as React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import TextField from '@mui/material/TextField';


const InputNumber = (props) =>{

    const { name, label, onChange } = props

   // const [values, setValues] = React.useState({numberformat: '1320'});


    return (
        <TextField
            label={label}
            name={name}
            type="number"
            variant="outlined"
         />

    );
}

export default InputNumber;