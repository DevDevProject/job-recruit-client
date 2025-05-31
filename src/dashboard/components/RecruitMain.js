import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import ChartUserByCountry from './ChartUserByCountry';
import CustomizedTreeView from './CustomizedTreeView';
import CustomizedDataGrid from './CustomizedDataGrid';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { useState, useEffect } from 'react'
import { useMediaQuery, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MultiSelectBox from './MultiSelectBox';
import SearchIcon from '@mui/icons-material/Search';
import {categories, locations, industries, stacks, experiences, types} from '../internals/data/RecruitOptions';
import AutoCompleteSelect from './AutoCompleteSelect';
import axios from 'axios';
import SortButton from './SortButton';
import ChartCategory from './ChartCategory';
import ChartStack from './ChartStack';
import SingleSelectBox from './SingleSelectBox';
import SelectPopup from './SelectPopup';

export default function RecruitMain() {

  const [type, setType] = React.useState([]);
  const [category, setCategory] = React.useState([]);
  const [experience, setExperience] = React.useState([]);
  const [stack, setStack] = React.useState([]);
  const [location, setLocation] = React.useState([]);
  const [companyType, setCompanyType] = React.useState([]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [totalCount, setTotalCount] = useState(0);
  const [sort, setSort] = useState('created_at');

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowCount, setRowCount] = useState(0);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState(0);

  const [filterState, setFilterState] = React.useState({
    type: [],
    category: [],
    experience: [],
    stack: [],
    location: [],
    companyType: [],
  });

  function clearCondition() {
    setType([]);
    setCategory([]);
    setStack([]);
    setExperience([]);
    setType([]);
    setLocation([]);
  }

  function searchRecruit() {
    setSearch(search + 1)
  }

  useEffect(() => {

    axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/recruit/search`,
      {
        stacks: stack,
        categories: category,
        company_types: type,
        regions: location,
        work_experiences: experience
      },
      {
        params: {
          page,
          sort
        }
      }
    )
        .then((res) => {
            setRows(res.data.recruits)
            setRowCount(res.data.total_count)
            setTotalCount(res.data.total_count)
            setLoading(false)
        })
        .catch((err) => {
            setLoading(false)
        })
  }, [page, search])

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }} align='start'>
        검색 옵션
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        {!isMobile ? (
          <>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => clearCondition()}>
                초기화
              </Button>
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
              <Button variant='outlined' startIcon={<SearchIcon />} onClick={searchRecruit}>
                검색하기
              </Button>
            </Stack>
          </>
        ) : (
          <>
            {/* <Button variant="contained" onClick={() => setOpen(true)}>모바일</Button> */}

            <SelectPopup
              type={type} setType={setType}
              category={category} setCategory={setCategory}
              experience={experience} setExperience={setExperience}
              stack={stack} setStack={setStack}
              location={location} setLocation={setLocation}
              companyType={companyType} setCompanyType={setCompanyType}
              categories={categories}
              types={types}
              experiences={experiences}
              stacks={stacks}
              locations={locations}
              industries={industries}
              searchRecruit={searchRecruit}
            />
          </>
        )}

      </Grid>
      <Grid>
        <Stack
          direction="row"
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: '100%' }}
          mb={2}
        >
          <Typography component="h2" variant="h6">
            공고 {" "}
            <Box component="span" sx={{ color: 'success.main', fontWeight: 600 }}>
              {totalCount.toLocaleString()}
            </Box>
            개
          </Typography>

          <Stack direction="row" spacing={1}>
            <SortButton 
              sort={sort}
              onChange={setSort}
            />
          </Stack>
        </Stack>
      </Grid>
      <Grid container spacing={2} columns={1}>
        <Grid size={{ xs: 12, lg: 9 }}>
          <CustomizedDataGrid 
            rows={rows}
            loading={loading}
            page={page}
            rowCount={rowCount}
            setPage={setPage}
          />
        </Grid>
        
      </Grid>
    </Box>
  );
}
