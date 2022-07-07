import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FilledInput from '@mui/material/FilledInput';
import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';


const InputPassword = (props) => {

    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

    const name = props.name;
    const onChange = props.onChange;
    const error = props.error == "" ? null : props.error;
    

    const handleChange = (prop) => (event) => {
        onChange(event.target.name, event.target.value);
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <FormControl key='password' sx={{ marginTop: 5, width: '30ch' }} 
        variant="filled" {...(error && {error:true})}>
            <InputLabel htmlFor="filled-adornment-password">Contraseña</InputLabel>
            <FilledInput
                name={name}
                id="filled-adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange('password')}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                
            />
            <FormHelperText id="my-helper-text">{error && error}</FormHelperText>

        </FormControl>
    );
}

export default InputPassword;