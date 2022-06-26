import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';




export default function DatePickerIn(props) {
    const [values, setValues] = React.useState(null);

    const { name, label, value, onChange } = props

    React.useEffect(()=>{
        setValues(value);
    },[value]);

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label={label}
                value={values}
                name={name}
                inputFormat="yyyy/MM/dd"
                onChange={(newValue) => {
                    setValues(newValue);
                    console.log(newValue);
                    onChange('fecha',newValue.toLocaleDateString("en-CA"));
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}