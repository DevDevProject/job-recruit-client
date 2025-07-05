import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiCard from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import ForgotPassword from './ForgotPassword';
import { GoogleIcon, FacebookIcon, SitemarkIcon, AppleIcon, GitHubIcon, KakaoIcon } from './CustomIcons';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

// const BACKEND_URL = 'https://api.alldevhub.com';
const BACKEND_URL = 'http://localhost:8080';

export default function SignInCard() {

  const loginSocialId = (provider) => {
    window.location.href = `${BACKEND_URL}/oauth2/authorization/${provider}`;
  }

  return (
    <Card variant="outlined">
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <SitemarkIcon />
      </Box>
      <Typography
        component="h1"
        variant="h4"
        sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
      >
        로그인
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<GoogleIcon />}
          onClick={() => loginSocialId('google')}
          sx={{
            backgroundColor: 'white',
            fontWeight: 600,
            borderColor: '#ddd',
          }}
        >
          Google 계정으로 로그인
        </Button>
        <Button
          variant="outlined"
          startIcon={<GitHubIcon />}
          onClick={() => loginSocialId('github')}
          sx={{
            backgroundColor: 'white',
            textTransform: 'none',
            fontWeight: 600,
            borderColor: '#ddd',
          }}
        >
          GitHub 계정으로 로그인
        </Button>
        <Button
          variant="outlined"
          startIcon={<KakaoIcon sx={{ ml: '-5px' }}/>}
          onClick={() => loginSocialId('kakao')}
          sx={{
            backgroundColor: 'white',
            textTransform: 'none',
            fontWeight: 600,
            borderColor: '#ddd',
          }}
        >
          Kakao 계정으로 로그인
        </Button>
      </Box>
    </Card>
  );
}