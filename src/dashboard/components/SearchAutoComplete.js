import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function SearchAutoComplete({ options, handleSearch }) {
    const [query, setQuery] = React.useState('');

    return (
        <FormControl sx={{ width: { xs: '50%', md: '30ch' } }} variant="outlined">
            <Autocomplete
                freeSolo
                disableClearable
                options={options}
                inputValue={query}
                onInputChange={(event, newInputValue) => {
                    setQuery(newInputValue);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        placeholder="Search…"
                        size="small"
                        variant="outlined"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchRoundedIcon
                                        fontSize="small"
                                        sx={{ cursor: 'pointer' }}
                                        onClick={() => handleSearch(query)}
                                    />
                                </InputAdornment>
                            ),
                            disableUnderline: true,
                        }}
                        inputProps={{
                            ...params.inputProps,
                            'aria-label': 'search',
                        }}
                    />
                )}
            />
        </FormControl>
    );
}
