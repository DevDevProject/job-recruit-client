import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Stack, Divider, Typography } from '@mui/material';
import MultiSelectBox from './MultiSelectBox';
import SingleSelectBox from './SingleSelectBox';
import AutoCompleteSelect from './AutoCompleteSelect';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

export default function SelectPopup({
  type, setType,
  category, setCategory,
  experience, setExperience,
  stack, setStack,
  location, setLocation,
  companyType, setCompanyType,
  categories, types, experiences, stacks, locations, industries,
  searchRecruit
}) {
  const [open, setOpen] = useState(false);

  function clearCondition() {
    setType([]);
    setCategory([]);
    setStack([]);
    setExperience([]);
    setType([]);
    setLocation([]);
  }

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        sx={{
          borderColor: 'primary.main',
          '&:hover': {
            borderColor: 'primary.dark',
            backgroundColor: 'dark'
          }
        }}
      >
        조건 검색
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth PaperProps={{
        sx: {
          height: '80vh',
        },
      }}>
        <DialogTitle>옵션 선택</DialogTitle>
        <DialogContent>
          <Stack direction="column" spacing={2} flexWrap="wrap">

            <MultiSelectBox
              placeholder='직무'
              value={category}
              onChange={setCategory}
              options={categories}
            />
            <MultiSelectBox
              placeholder='채용 형태'
              value={type}
              onChange={setType}
              options={types}
            />
            <MultiSelectBox
              placeholder='회사 유형'
              value={companyType}
              onChange={setCompanyType}
              options={industries}
            />
            <MultiSelectBox
              placeholder='지역'
              value={location}
              onChange={setLocation}
              options={locations}
            />
            <SingleSelectBox
              placeholder='경력'
              value={experience}
              onChange={setExperience}
              options={experiences}
            />
            <AutoCompleteSelect
              placeholder='기술 스택'
              value={stack}
              onChange={setStack}
              options={stacks}
            />
            <Stack direction="row" justifyContent="space-between">
              <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => clearCondition()}>
                초기화
              </Button>
              <Button variant='outlined' startIcon={<SearchIcon />} onClick={searchRecruit}>
                검색하기
              </Button>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>닫기</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
