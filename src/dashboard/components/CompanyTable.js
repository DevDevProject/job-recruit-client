import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import axios from 'axios';
import CompanyRow from './CompanyRow';
import Search from './Search';
import Stack from '@mui/material/Stack';
import SearchAutoComplete from './SearchAutoComplete';
import CompanyCard from '../../company/components/CompanyCard';
import { Grid } from '@mui/material';

export default function CompanyTable({ data = [], page, handlePageChange, total }) {

  return (
    <Box sx={{ width: '100%', px: { xs: 1, sm: 2, md: 4 }, py: 3 }}>
      <Grid container spacing={2}>
        {data.map((row, index) => (
          <Grid
            item
            key={index}
            size={{
              xs:12,
              md:6
            }}
          >
            <CompanyCard row={row} />
          </Grid>
        ))}
      </Grid>


      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', pt: 4, width: '100%' }}>
        <Pagination
          variant='outlined'
          count={Math.ceil(total / 20)}
          page={page}
          onChange={handlePageChange}
          boundaryCount={3}
          showFirstButton
          showLastButton
        />
      </Box>
    </Box>
  );
}
