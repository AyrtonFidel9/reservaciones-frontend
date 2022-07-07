import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';


const InputUserN = (props) => {
    const [inputUser, setInputUser] = useState({
        name: '',
        value: ''
    });

    const onChange = props.onChange;
    const name = props.name;
    const error = props.error == "" ? null : props.error;

    //console.log(props);

    const handleChangeInput = (event) => {
        event.preventDefault();
        onChange(event.target.name, event.target.value);
        setInputUser({ value: event.target.value });
    }

    return (
        <TextField sx={{ marginTop: 5, width: '30ch' }}
            id="filled-basic" label="Usuario" name={name} variant="filled"
            onChange={handleChangeInput}
            value={inputUser.value}
            {...(error && {error:true, helperText:error})}
        />
    );
}

export default InputUserN;