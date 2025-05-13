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

export default function CompanyTable({data, page, handlePageChange, total}) {
  return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>회사 이름</TableCell>
              <TableCell align="right">지역</TableCell>
              <TableCell align="right">회사 규모</TableCell>
              <TableCell align="right">산업</TableCell>
              <TableCell align="right">설립일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <CompanyRow key={row.name} row={row} />
            ))}
          </TableBody>
        </Table>
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
      </TableContainer>
  );
}
