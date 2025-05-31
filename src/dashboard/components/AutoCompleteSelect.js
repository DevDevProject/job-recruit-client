import React, { useState, useRef } from 'react';
import {
    Box,
    Button,
    Popper,
    Paper,
    Autocomplete,
    TextField,
    Chip,
    Stack,
    ClickAwayListener,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function CustomPopper(props) {
  return <Popper {...props} style={{ zIndex: 2100, marginTop: 4, width: 300 }} />;
}

export default function AutoCompleteSelect({ placeholder, value, onChange, options }) {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
  
    const handleClickAway = () => setOpen(false);
  
    return (
      <Box>
        {/* 드롭다운 버튼 */}
        <Button
          variant="outlined"
          endIcon={<ExpandMoreIcon />}
          ref={anchorRef}
          onClick={() => setOpen((prev) => !prev)}
        >
          {placeholder}
        </Button>
  
        {/* 드롭다운 팝업 */}
        <Popper open={open} anchorEl={anchorRef.current} placement="bottom-start" style={{ zIndex: 2000 }}>
          <ClickAwayListener onClickAway={handleClickAway}>
            <Paper elevation={3} sx={{ p: 2, width: 300, mt: 1 }}>
              {/* 검색 가능한 멀티 선택 */}
              <Autocomplete
                multiple
                options={options}
                value={value}
                onChange={(e, newValue) => {
                    onChange(newValue)
                }}
                PopperComponent={CustomPopper}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField {...params} label="기술 스택 검색" placeholder="입력 후 선택" />
                )}
                renderTags={() => null}
              />
  
              {/* 선택된 스택들 */}
              <Stack direction="row" spacing={1} sx={{ mt: 2, flexWrap: 'wrap' }}>
                {value.map((stack, index) => (
                  <Chip
                    key={index}
                    label={stack}
                    onDelete={() => onChange(value.filter((s) => s !== stack))}
                  />
                ))}
              </Stack>
            </Paper>
          </ClickAwayListener>
        </Popper>
      </Box>
    );
  }
  