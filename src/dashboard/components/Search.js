import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { IconButton } from '@mui/material';

export default function Search( { searchQuery, setSearchQuery } ) {
  const [inputValue, setInputValue] = React.useState(searchQuery || '');

  // 엔터키 눌렀을 때 검색
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setSearchQuery(inputValue.trim());
    }
  };

  // 돋보기 클릭 시 검색
  const handleSearchClick = () => {
    setSearchQuery(inputValue.trim());
  };

  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        sx={{ flexGrow: 1 }}
        endAdornment={
          <InputAdornment position="end" sx={{ color: 'text.primary' }}>
              <SearchRoundedIcon 
                fontSize="small" 
                sx={{ cursor: 'pointer' }}
                onClick={handleSearchClick}
              />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </FormControl>
  );
}
