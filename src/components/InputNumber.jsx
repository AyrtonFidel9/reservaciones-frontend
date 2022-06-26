import * as React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import TextField from '@mui/material/TextField';


const InputNumber = (props) =>{

    const { name, label, value ,onChange } = props

    const [values, setValues] = React.useState(0);

    React.useEffect(()=>{
        setValues(value);
    }, [value]);

   // const [values, setValues] = React.useState({numberformat: '1320'});


    return (
        <TextField
            label={label}
            name={name}
            value={values}
            type="number"
            variant="outlined"
            onChange={((e)=>{
                console.log(e.target.value);
                setValues(e.target.value);
                onChange(e);
            })}
         />

    );
}

export default InputNumber;