import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function BasicTimePicker(props) {
  const [values, setValue] = React.useState(null);

  const { name, label, value, onChange } = props;

  React.useEffect(() => {
    console.log("HORRAAA -> "+values);
    setValue(value);
    console.log(value);
    console.log("HORRAAA -> "+values);
  }, [value]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        label={label}
        value={values}
        name={name}
        inputFormat="HH:mm"
        onChange={(newValue) => {
          setValue(newValue);
          console.log(newValue.toLocaleTimeString());
          console.log(newValue.getTime());
          onChange("hora", newValue.toLocaleTimeString());
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}