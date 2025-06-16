import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SortButton({ sort, onChange }) {
    const handleChange = (event) => {
        const selectedValue = event.target.value
        onChange(selectedValue)
      };

  return (
    <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">정렬</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={sort}
          onChange={handleChange}
          autoWidth
          label="sort"
        >
          <MenuItem value='created_at'>최근 등록 순</MenuItem>
          <MenuItem value='deadline'>마감 임박 순</MenuItem>
          <MenuItem value='popular'>인기순</MenuItem>
        </Select>
      </FormControl>
  );
}
