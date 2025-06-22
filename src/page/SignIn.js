import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import AppTheme from '../shared-theme/AppTheme';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import SignInCard from '../dashboard/components/SignInCard';
import Content from '../dashboard/components/Content';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Header from '../dashboard/components/Header';


export default function SignIn(props) {
  return (
      <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden', mt: 13 }}>
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}

        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            {/* <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} /> */}
            <Stack
              direction="column"
              component="main"
              sx={[
                {
                  justifyContent: 'center',

                  position: 'relative',
                },
                (theme) => ({
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    zIndex: -1,
                    inset: 0,
                    backgroundImage:
                      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
                    backgroundRepeat: 'no-repeat',
                    ...theme.applyStyles('dark', {
                      backgroundImage:
                        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
                    }),
                  },
                }),
              ]}
            >
              <Stack
                direction={{ xs: 'column-reverse', md: 'row' }}
                sx={{
                  justifyContent: 'center',
                  gap: { xs: 6, sm: 12 },
                  p: 2,
                  mx: 'auto',
                }}
              >
                <Stack
                  direction={{ xs: 'column-reverse', md: 'row' }}
                  sx={{
                    justifyContent: 'center',
                    gap: { xs: 6, sm: 12 },
                    p: { xs: 2, sm: 4 },
                    m: 'auto',
                  }}
                >
                  <Content />
                  <SignInCard />
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Box>
  );
}