import * as React from 'react';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from '../dashboard/components/AppNavbar';
import Header from '../dashboard/components/Header';
import SideMenu from '../dashboard/components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useParams } from 'react-router-dom';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from '../dashboard/theme/customizations';
import { Helmet } from 'react-helmet';
import { Button, Typography } from '@mui/material';
import axios from 'axios';
import CompanyHeader from '../dashboard/components/RecruitDetailHeader';
import RecruitPostImage from '../recruit/components/RecruitPostImage';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function RecruitDetail(props) {
  const [company, setCompany] = React.useState({})

  return (
    <>
      <Helmet>
        <title>{company.name ?? ''} 채용 정보 - AllDevHub</title>
      </Helmet>
      <AppTheme {...props} themeComponents={xThemeComponents}>
        <CssBaseline enableColorScheme />
        <Box sx={{ display: 'flex' }}>
          <SideMenu />
          <AppNavbar />
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
              <DetailContent
                company={company}
                setCompany={setCompany}
              />

            </Stack>
          </Box>
        </Box>
      </AppTheme>
    </>
  );
}

function DetailContent( { company, setCompany } ) {
  const params = useParams();

  
  const [detail, setDetail] = React.useState('')
  const [options, setOptions] = React.useState('')

  React.useEffect(() => {

    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/recruit/${params.id}`)
      .then((res) => {
        setCompany(res.data.company)
        setDetail(res.data.detail)
        setOptions(res.data.options)
      })
      .catch(err => console.error('카테고리 로딩 실패', err));
  }, []);

  return (
    <Stack sx={{
      width: '100%',
      alignItems: 'start',
      maxWidth: '800px',
      mx: { xs: 0, md: 'auto' },
      px: { xs: 2, md: 0 },
    }}>
      <CompanyHeader
        company={company}
        options={options}
      />
      {detail.responsibility && (
        <div className='recruit-body'>
          <Typography variant='h2'>주요 업무</Typography>
          {detail.responsibility.split('\n').map(line => line.trimStart()).join('\n')}
        </div>
      )}

      {detail.requirement && (
        <div className='recruit-body'>
          <Typography variant='h2'>자격 요건</Typography>
          {detail.requirement.split('\n').map(line => line.trimStart()).join('\n')}
        </div>
      )}

      {detail.preference && (
        <div className='recruit-body'>
          <Typography variant='h2'>우대 사항</Typography>
          {detail.preference.split('\n').map(line => line.trimStart()).join('\n')}
        </div>
      )}

      {detail.benefit && (
        <div className='recruit-body'>
          <Typography variant='h2'>복지 및 혜택</Typography>
          {detail.benefit.split('\n').map(line => line.trimStart()).join('\n')}
        </div>
      )}

      {detail.process && (
        <div className='recruit-body'>
          <Typography variant='h2'>채용 절차</Typography>
          {detail.process.split('\n').map(line => line.trimStart()).join('\n')}
        </div>
      )}
      <img src={"/test.png"}></img>
      <div className='right-bottom-fix'>
        <Button sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          width: 48,
          height: 48,
          minWidth: 0,
          padding: 0,
          marginRight: 1
        }}>
          <BookmarkBorderIcon />
        </Button>
        <Button sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          height: 48,
          minWidth: 0,
          padding: 2
        }} onClick={() => window.open(options.url)}>
          지원하기
        </Button>
      </div>
    </Stack>
  )
}