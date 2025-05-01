import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { columns, rows } from '../internals/data/gridData';

import axios from 'axios'

export default function CustomizedDataGrid({ rows, loading, rowCount, page, pageSize, setRows, setLoading, setRowCount, setPage, setPageSize }) {

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
            initialState={{
                pagination: {
                  paginationModel: { pageSize: 25, page: 0 },
                },
              }}
            pagination
            pageSizeOptions={[]}
            onRowClick={(params) => {
                const url = params.row.url;
                if (url) {
                  window.open(url, '_blank');
                }
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
