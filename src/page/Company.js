import * as React from 'react';

import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from '../dashboard/components/AppNavbar';
import Header from '../dashboard/components/Header';
import MainGrid from '../dashboard/components/MainGrid';
import SideMenu from '../dashboard/components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from '../dashboard/theme/customizations';
import Search from '../dashboard/components/Search';
import Table from '../dashboard/components/CompanyTable';

import CompanyTable from '../dashboard/components/CompanyTable';
import { Typography } from '@mui/material';

import axios from 'axios';
import SearchAutoComplete from '../dashboard/components/SearchAutoComplete';
import { Helmet } from 'react-helmet';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

function createData(
  id,
  name,
  region,
  industry,
  size,
  establishment,
  logo_url,
  homepage_url,
  detail
) {
  return {
    id,
    homepage_url,
    logo_url,
    name,
    region,
    industry,
    size,
    establishment,
    detail
  };
}

export default function Company(props) {

  const [options, setOptions] = React.useState([])
  const [data, setData] = React.useState([])
  const [total, setTotal] = React.useState(0)
  const [page, setPage] = React.useState(1)
  const [searchQuery, setSearchQuery] = React.useState()

  function handleSearch(query) {
    setSearchQuery(query)
    setPage(1)
  }

  React.useEffect(() => {
    const params = {
      fields: 'name',
      page_size: 2000
    }
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/company/companies`, {
      params
    })
      .then(res => {
        const names = res.data.companies.map(company => company.name)
        setOptions(names)
      })
      .catch(err => console.log(err))
  }, [])

  const handlePageChange = (value) => {
    setPage(value);
  };

  React.useEffect(() => {
    
    const params = {
      fields: "id,name,region,industry,size,establishment,representation,revenue,address,employee_count,homepage_url,logo_url",
      page: page,
      page_size: 20,
    }

    if (searchQuery) {
      params.search = searchQuery;
    }
    
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/company/companies`, { params })
      .then((res) => {
        const trans = res.data.companies.map((company) =>
          createData(
            company.id,
            company.name,
            company.region,
            company.industry,
            company.size,
            company.establishment,
            company.logo_url,
            company.homepage_url,
            {
              representation: company.representation,
              revenue: company.revenue,
              address: company.address,
              employee_count: company.employee_count
            }
          )
        )
        setTotal(res.data.total)
        setData(trans)
      })
      .catch(err => console.log(err))
  }, [page, searchQuery])

  return (
    <>
    <Helmet>
      <title>기업 정보 - AllDevHub</title>
    </Helmet>
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        <AppNavbar />
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <Typography variant='h4'>
              기업 정보
            </Typography>
            <Stack
              direction="row"
              sx={{
                display: { xs: 'none', md: 'flex' },
                width: '100%',
                alignItems: { xs: 'flex-start', md: 'center' },
                justifyContent: 'space-between',
                maxWidth: { sm: '100%', md: '1700px' },
                pt: 1.5,
              }}
              spacing={2}
            >
              <Stack direction="row" sx={{ gap: 1 }}>
                <SearchAutoComplete
                  handleSearch={handleSearch}
                  options={options}
                />
              </Stack>
            </Stack>
            <CompanyTable
              data={data}
              page={page}
              handlePageChange={handlePageChange}
              total={total}
            />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
    </>
  );
}
