import { Box, Pagination } from "@mui/material";

export default function CustomPagination({ total, limit, page, handlePageChange }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', pt: 4, width: '100%' }}>
      <Pagination
        count={Math.ceil(total / limit)}
        page={page}
        onChange={handlePageChange}
        boundaryCount={3}
        showFirstButton
        showLastButton
      />
    </Box>
  )
}