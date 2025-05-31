import * as React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import MuiDrawer, { drawerClasses } from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import SelectContent from './SelectContent';
import MenuContent from './MenuContent';
import CardAlert from './CardAlert';
import OptionsMenu from './OptionsMenu';
import Button from '@mui/material/Button';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import LoginIcon from '@mui/icons-material/Login';
const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: 'border-box',
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: 'border-box',
  },
});

export default function SideMenu() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: 'background.paper',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mt: 'calc(var(--template-frame-height, 0px) + 4px)',
          p: 1.5,
          height: 100,
          cursor: 'pointer'
        }}
        onClick={() => window.location.href='/'}
        
      >
        <Box
          sx={{
            height: '100%',
            aspectRatio: '1', // 동그란 정사각형 로고
            mr: 0,
          }}
        >
          <img
            src={process.env.PUBLIC_URL + '/alldev.png'}
            alt="My Logo"
            style={{
              height: '100%',
              width: '100%',
              objectFit: 'contain',
              display: 'block',
            }}
          />
        </Box>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: 'rgb(93, 182, 245)', // 로고색과 맞추기
            fontSize: '1.75rem',       // 필요시 조정
          }}
        >
          AllDevHub
        </Typography>
      </Box>
      {/* <SelectContent /> */}
      <Divider />

      <Box
        sx={{
          overflow: 'auto',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          
        }}
      >
        <MenuContent />
        {/* <CardAlert /> */}
      </Box>
      <Divider />
      {/* <Stack
        direction='row'
        spacing={2}
        justifyContent={'center'}
        mb={1}
        mt={1}
      >
      <Button
          color="primary"
          sx={{ textTransform: 'none', marginBottom: '3px' }}
          onClick={() => console.log('로그인')}
        >
          로그인
      </Button>
      <Button
          color="primary"
          sx={{ textTransform: 'none', marginBottom: '3px' }}
          onClick={() => console.log('로그인')}
        >
          회원가입
      </Button>
      </Stack> */}
      <Stack 
        sx={{ p: 2 }}
        
      >
        {/* <Button variant="outlined" fullWidth startIcon={<LogoutRoundedIcon />}>
          Logout
        </Button> */}
        <Button variant="outlined" fullWidth startIcon={<LoginIcon />}>
          Login / Sign up
        </Button>
      </Stack>
      
    </Drawer>
  );
}
