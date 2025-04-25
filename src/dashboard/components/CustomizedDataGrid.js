import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { columns, rows } from '../internals/data/gridData';

import axios from 'axios'

export default function CustomizedDataGrid() {

    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/recruit/list`)
            .then((res) => {
                console.log("success", res)
                setRows(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log("data loading failed", err);
                setLoading(false)
            })
    }, [])

    return (
        <DataGrid
            rows={rows}
            columns={columns}
            getRowClassName={(params) =>
                params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }
            pagination={false}
            initialState={{
                pagination: { paginationModel: { pageSize: 20 } },
            }}
            pageSizeOptions={[10, 20, 50]}
            onRowClick={(params) => {
                const url = params.row.url;
                if (url) {
                  window.open(url, '_blank');
                }
              }}
            hideFooter
            autoHeight
            getRowClassName={() => 'clickable-row'}
            density="compact"
            slotProps={{
                filterPanel: {
                    filterFormProps: {
                        logicOperatorInputProps: {
                            variant: 'outlined',
                            size: 'small',
                        },
                        columnInputProps: {
                            variant: 'outlined',
                            size: 'small',
                            sx: { mt: 'auto' },
                        },
                        operatorInputProps: {
                            variant: 'outlined',
                            size: 'small',
                            sx: { mt: 'auto' },
                        },
                        valueInputProps: {
                            InputComponentProps: {
                                variant: 'outlined',
                                size: 'small',
                            },
                        },
                    },
                },
            }}
        />
    );
}
