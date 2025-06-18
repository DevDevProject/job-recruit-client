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
import { Helmet } from 'react-helmet';
import MetaTag from '../shared/components/MetaTag';

export default function Dashboard(props) {
  return (
    <>
      <Box sx={{ display: 'flex', mt: 2 }}>
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
            <MainGrid />
          </Stack>
        </Box>
      </Box>
      <MetaTag
        title="개발자의 모든 정보를 한 눈에 - AllDevHub"
        description="AllDevHub - 개발자를 위한 IT 채용 공고, 블로그 제공 사이트"
        keywords="취업,채용,구인,구직,일자리,취업정보,채용정보,기업정보,취업사이트,기업사이트,채용플랫폼,채용플래폼,채용공고,대기업 채용,공채,상반기공채,하반기공채,기업리뷰,연봉,면접,이직,이력서,AllDevHub"
      />
    </>
  );
}
