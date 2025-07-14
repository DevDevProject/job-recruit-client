// TopNavBar.jsx
import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingPopUp from './SettingPopUp';
import ProfilePopUp from './ProfilePopUp';

const pages = [
  { label: '채용 공고', action: (navigate) => navigate('/recruit') },
  { label: '기술 블로그', action: (navigate) => navigate('/blog') },
  { label: '기업 정보', action: (navigate) => navigate('/company') },
  { label: '설정', action: (openDialogFunc) => openDialogFunc() },
];

export default function TopNavBar() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [anchorProfile, setAnchorProfile] = useState(null);

  const showProfilePopUp = (event) => {
    setAnchorProfile(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorProfile(null);
  };

  const open = Boolean(anchorProfile);

  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('jwt'));

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [openSettingsDialog, setOpenSettingsDialog] = useState(false);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (actionHandler) => {
    setAnchorEl(null);
    if (actionHandler && typeof actionHandler === 'function') {
      actionHandler();
    }
  };

  const handleOpenSettingsDialog = () => {
    setOpenSettingsDialog(true);
  };

  const handleCloseSettingsDialog = () => {
    setOpenSettingsDialog(false);
  };

  return (
    <AppBar
      position="fixed"
      color="default"
      elevation={1}
    >
      <Toolbar>
        <Box
          sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <img
            src={process.env.PUBLIC_URL + '/web_logo.png'}
            alt="AllDevHub Logo"
            style={{ height: 40, marginRight: 8 }}
          />
          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: '#5db6f5', display: { sm: 'block' } }}
          >
            AllDevHub
          </Typography>
        </Box>
        {isMobile ? (
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1 }}>
            {isLoggedIn ? (
              <>
                <Button onClick={showProfilePopUp}>
                  <AccountCircleIcon />
                </Button>
                <ProfilePopUp
                  open={open}
                  anchorEl={anchorProfile}
                  handleClose={handleClose}
                />
              </>
            ) : (
              <>
                <MenuItem onClick={() => handleMenuClose(() => navigate('/signin'))}>
                  <Typography textAlign="center">로그인 / 회원가입</Typography>
                </MenuItem>
              </>
            )}

            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}

            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => handleMenuClose()}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.label}
                  onClick={() => handleMenuClose(() => {
                    if (page.label === '설정') {
                      handleOpenSettingsDialog(); // '설정'이면 팝업 열기
                    } else {
                      page.action(navigate); // 다른 페이지면 navigate 호출
                    }
                  })}
                >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}

              {isLoggedIn ? (
                <MenuItem onClick={() => handleMenuClose(() => {
                  localStorage.removeItem('jwt');
                  navigate('/logout');
                })}>
                  <Typography
                    sx={{ color: '#d32f2f' }}
                    textAlign="center">로그아웃
                  </Typography>
                </MenuItem>
              ) : (
                <MenuItem onClick={() => handleMenuClose(() => navigate('/signin'))}>
                  <Typography textAlign="center">로그인 / 회원가입</Typography>
                </MenuItem>
              )}

            </Menu>

          </Box>
        ) : (
          <>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-start' }}>
              {pages.map((page) => (
                <Button
                  key={page.label}
                  color="inherit"
                  onClick={() => {
                    if (page.label === '설정') {
                      handleOpenSettingsDialog(); // '설정'이면 팝업 열기
                    } else {
                      page.action(navigate); // 다른 페이지면 navigate 호출
                    }
                  }}
                  sx={{ mx: 1, fontWeight: 600 }}
                >
                  {page.label}
                </Button>
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {
                isLoggedIn ? (
                  <>
                    <Button onClick={showProfilePopUp}>
                      <AccountCircleIcon />
                    </Button>
                    <ProfilePopUp
                      open={open}
                      anchorEl={anchorProfile}
                      handleClose={handleClose}
                    />
                  </>
                ) : (
                  <Button color="inherit" onClick={() => navigate('/signin')}>
                    로그인 / 회원가입
                  </Button>
                )
              }

            </Box>
          </>
        )}
      </Toolbar>

      <SettingPopUp
        open={openSettingsDialog}
        onClose={handleCloseSettingsDialog}
      />
    </AppBar>
  );
}