import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Copyright from '../internals/components/Copyright';
import Contact from '../internals/components/Contact';
import ChartCategory from './ChartCategory';
import ChartStack from './ChartStack';
import PopularSection from './PopularSection';



export default function MainGrid() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Typography component="h1" variant="h2" sx={{ mb: 5, mt: 5 }}>
        최신 IT 기업의{' '}
        <Box component="span" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          트렌드
        </Box>
        와{' '}
        <Box component="span" sx={{ color: 'secondary.main', fontWeight: 'bold' }}>
          관심사
        </Box>
        를 한 눈에 파악할 수 있어요
      </Typography>
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
          <ChartCategory />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 6 }}>
          <ChartStack />
        </Grid>
        <PopularSection />
      </Grid>
      
    </Box>
  );
}
