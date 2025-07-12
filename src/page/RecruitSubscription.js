import { Box, Grid, Stack, Typography } from "@mui/material";
import RecruitPost from "../recruit/components/RecruitPost";
import { alpha } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function RecruitSubscription() {

  const [rows, setRows] = useState([])
  const [rowCount, setRowCount] = useState(1)
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState('created_at');

  useEffect(() => {

    axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/recruit/search`,
      {
        stacks: [],
        categories: [],
        company_types: [],
        regions: [],
        work_experiences: []
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
      })
      .catch((err) => {
        console.log(err)
      })
  }, [page])

  const navigate = useNavigate()

  return (
    <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', mt: 13 }}>
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
            mt: { xs: 0, md: 0 },
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: '100%' }}
            mb={2}
          >
            <Typography component="h2" variant="h6">
              구독한 공고 {" "}
              <Box component="span" sx={{ color: 'success.main', fontWeight: 600 }}>
                {rowCount.toLocaleString()}
              </Box>
              개
            </Typography>
          </Stack>
          <Grid container spacing={2} justifyContent="start">
            {
              rows.map(row => (
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
        </Stack>
      </Box>
    </Box>
  )
}