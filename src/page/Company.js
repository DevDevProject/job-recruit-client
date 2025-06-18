import * as React from 'react';

import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from '../dashboard/components/AppNavbar';
import Header from '../dashboard/components/Header';
import SideMenu from '../dashboard/components/SideMenu';

import CompanyTable from '../dashboard/components/CompanyTable';
import { Typography } from '@mui/material';

import axios from 'axios';
import SearchAutoComplete from '../dashboard/components/SearchAutoComplete';
import MetaTag from '../shared/components/MetaTag';
import { companyTypes } from '../commons/data/RecruitOptions';

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

  const handlePageChange = (event, value) => {
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
      <Box sx={{ display: 'flex', mt: 10 }}>
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
            <Typography variant='h4'>
              기업 정보
            </Typography>
            <Stack
              spacing={2}
              direction="row"
              sx={{
                width: '100%', // 이 Stack이 부모 Stack의 전체 너비를 차지하게 합니다.
                justifyContent: 'space-between',
                px: { xs: 1, sm: 2, md: 20 }, py: 3 
              }}>
              <Typography component="h2" variant="h6">
                전체 {" "}
                <Box component="span" sx={{ color: 'success.main', fontWeight: 600 }}>
                  {total.toLocaleString()}
                </Box>
                개
              </Typography>
              <SearchAutoComplete
                handleSearch={handleSearch}
                options={options}
              />
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
      <MetaTag
        title='기업 정보 - AllDevHub'
        description={companyTypes}
        keywords={companyTypes}
        image="https://alldevhub.com/assets/preview.png"
        url="https://alldevhub.com"
      />
    </>
  );
}
