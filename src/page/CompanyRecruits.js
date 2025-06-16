import { Helmet } from "react-helmet";
import { alpha } from '@mui/material/styles';
import AppTheme from "../shared-theme/AppTheme";
import { Box, CssBaseline, Grid, Stack, Typography } from "@mui/material";
import SideMenu from "../dashboard/components/SideMenu";
import AppNavbar from "../dashboard/components/AppNavbar";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../dashboard/components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import CustomPagination from "../shared/components/CustomPagination";
import RecruitPost from "../recruit/components/RecruitPost";

import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from '../dashboard/theme/customizations';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function CompanyRecruits(props) {
  const { companyName: encodedName } = useParams();
  const companyName = decodeURIComponent(encodedName || '');
  const navigate = useNavigate();

  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    const params = {
      page,
      size: 10
    }

    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/recruit/${companyName}/recruits`, { params })
      .then(res => {
        setData(res.data.recruits)
        setTotalCount(res.data.total_count)
      }).catch(err => console.log(err))
  }, [companyName])

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Helmet>
        <title>{`${companyName} 채용 공고 - AllDevHub`}</title>
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
              <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
                <Grid
                  container
                  spacing={2}
                  columns={12}
                  sx={{ mb: (theme) => theme.spacing(2) }}
                >
                  <Header />
                  <Typography component="h2" variant="h6">
                    공고 {" "}
                    <Box component="span" sx={{ color: 'success.main', fontWeight: 600 }}>
                      {totalCount.toLocaleString()}
                    </Box>
                    개
                  </Typography>
                  <Grid container spacing={2} justifyContent="start">
                    {
                      data.map(row => (
                        <Grid item
                          size={{
                            xs: 12,
                            md: 6
                          }}
                          sx={{
                            cursor: 'pointer'
                          }}
                          onClick={() => navigate(`/recruit/${row.id}`)}
                        >
                          <RecruitPost
                            row={row}
                            maxTechStacks={5}
                          />
                        </Grid>
                      ))
                    }
                  </Grid>
                  <CustomPagination
                    total={totalCount}
                    limit={10}
                    page={page}
                    handlePageChange={handlePageChange}
                  />
                </Grid>
              </Box>
            </Stack>
          </Box>
        </Box>
      </AppTheme>
    </>
  )
}