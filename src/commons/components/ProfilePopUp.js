import { Box, Button, Popover, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ProfilePopUp({ open, anchorEl, handleClose }) {
  const navigate = useNavigate();

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
    >
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Button
          color="error"
          sx={{ width: 'auto', alignSelf: 'flex-start' }}
        >
          채용 구독 목록
        </Button>
        <Button
          color="error"
          sx={{ width: 'auto', alignSelf: 'flex-start' }}
        >
          회사 구독 목록
        </Button>
        <Button
          sx={{ width: 'auto', alignSelf: 'flex-start', color: '#d32f2f' }}
          onClick={() => {
            localStorage.removeItem('jwt');
            handleClose();
            window.location.reload();
          }}
        >
          로그아웃
        </Button>
      </Box>
    </Popover>
  )
}