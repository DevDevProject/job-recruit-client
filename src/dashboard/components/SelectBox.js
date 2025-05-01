import React from 'react';
import { Box, FormControl, InputLabel, NativeSelect } from '@mui/material';

export default function SelectBox({ label, options = [], defaultValue = '', onChange }) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">{label}</InputLabel>
        <NativeSelect
          defaultValue={defaultValue}
          onChange={onChange}
        >
          {options.map((opt, index) => (
            <option key={index} value={opt.value}>{opt.label}</option>
          ))}
        </NativeSelect>
      </FormControl>
    </Box>
  );
}