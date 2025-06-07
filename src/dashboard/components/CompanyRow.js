import React from 'react';
import {
  Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Link
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

export default function CompanyRow( { row } ) {
  const theme = useTheme();
  const navigate = useNavigate()

  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        sx={{
          '& > *': { borderBottom: '1px solid rgba(224, 224, 224, 1)' },
          '&:hover': { backgroundColor: theme.palette.action.selected },
          cursor: 'pointer',
        }}
        onClick={() => navigate(`/company/${encodeURIComponent(row.name)}`)}
      >
        <TableCell>
          <IconButton aria-label="expand row" size="small">
            <img
              src={row.logo_url ?? "/company_logo.png"}
              alt={row.name + " logo"}
              style={{ width: 32, height: 32, objectFit: "contain" }}
            />
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{row.name ?? "-"}</TableCell>
        <TableCell align="right">{row.region ?? "-"}</TableCell>
        <TableCell align="right">{row.industry ?? "-"}</TableCell>
        <TableCell align="right">{row.size ?? "-"}</TableCell>
        <TableCell align="right">{row.establishment ?? "-"}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                margin: 2,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'grey.300',
                padding: 2,
                boxShadow: theme.shadows[1],
              }}
            >
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>대표 이름</TableCell>
                    <TableCell>매출액</TableCell>
                    <TableCell align="left">상세 주소</TableCell>
                    <TableCell align="left">홈페이지 주소</TableCell>
                    <TableCell align="right">직원 수</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{row.detail.representation ?? "-"}</TableCell>
                    <TableCell>{row.detail.revenue ?? "-"}</TableCell>
                    <TableCell align="left">{row.detail.address ?? "-"}</TableCell>
                    <TableCell align="left">
                      {row.homepage_url ? (
                        <Link
                          href={row.homepage_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          underline="hover"
                        >
                          {row.homepage_url}
                        </Link>
                      ) : "-"}
                    </TableCell>
                    <TableCell align="right">{row.detail.employee_count ?? "-"}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
