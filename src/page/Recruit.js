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
import RecruitMain from '../dashboard/components/RecruitMain';
import { Helmet } from 'react-helmet';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function Recruit(props) {
  return (
    <>
    <Helmet>
      <title>개발자 채용 공고 - AllDevHub</title>
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
            <RecruitMain />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
    </>
  );
}
