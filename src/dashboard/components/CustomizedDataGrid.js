import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { columns, rows } from '../internals/data/gridData';
import { useNavigate } from 'react-router-dom'

import axios from 'axios'

export default function CustomizedDataGrid({ rows, loading, rowCount, page, pageSize, setRows, setLoading, setRowCount, setPage, setPageSize }) {

  const navigate = useNavigate();

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      getRowClassName={(params) =>
        params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
      }
      initialState={{
        pagination: {
          paginationModel: { pageSize: 20, page: 0 },
        },
      }}
      pagination
      pageSizeOptions={[]}
      onRowClick={(params) => {
        const id = params.row.id;
        navigate(`/recruit/${id}`);
      }}
      // hideFooter
      rowCount={rowCount}
      paginationMode='server'
      onPaginationModelChange={(params) => {
        setPage(params.page);
      }}
      page={page}
      disableColumnMenu
      autoHeight
      loading={loading}
      getRowClassName={() => 'clickable-row'}
      density="compact"
      getRowId={(row) => row.id}
    />
  );
}
