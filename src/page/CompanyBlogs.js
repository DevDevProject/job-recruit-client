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

import BlogGrid from "../dashboard/components/BlogGrid";
import MetaTag from "../shared/components/MetaTag";
import { stacks } from "../commons/data/RecruitOptions";


export default function CompanyBlogs(props) {
  const { companyName: encodedName } = useParams();
  const companyName = decodeURIComponent(encodedName || '');
  const navigate = useNavigate();

  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(20)

  const [totalCount, setTotalCount] = useState(0)

  useEffect(() => {
    const params = {
      page,
      limit
    }

    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/blog/${companyName}/blogs`, { params })
      .then(res => {
        setData(res.data.blogs)
        setTotalCount(res.data.total_count)
      }).catch(err => console.log(err))
  }, [companyName, page])

  const handlePageChange = (event, value) => {
    setPage(value);
  };

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
            <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
              <Grid
                container
                spacing={2}
                columns={12}
                sx={{ mb: (theme) => theme.spacing(2) }}
              >
                <Header />
                <Typography component="h2" variant="h6">
                  전체 {" "}
                  <Box component="span" sx={{ color: 'success.main', fontWeight: 600 }}>
                    {totalCount.toLocaleString()}
                  </Box>
                  개
                </Typography>
                <Grid container spacing={2} justifyContent="start">

                  <BlogGrid
                    cardData={data}
                    total={totalCount}
                    limit={limit}
                    page={page}
                    handlePageChange={handlePageChange}
                  />

                </Grid>
              </Grid>
            </Box>
          </Stack>
        </Box>
      </Box>
      <MetaTag
        title={`${companyName} 기술 블로그 - AllDevHub`}
        description={stacks}
        keywords={stacks}
        image="https://alldevhub.com/assets/preview.png"
        url="https://alldevhub.com"
      />
    </>
  )
}