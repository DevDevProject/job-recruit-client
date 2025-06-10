import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Breadcrumbs, { breadcrumbsClasses } from '@mui/material/Breadcrumbs';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { useLocation, Link } from 'react-router-dom'; // ⭐ useLocation import!

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: (theme.vars || theme).palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: 'center',
  },
}));

export default function NavbarBreadcrumbs() {
  const location = useLocation(); // ⭐ 현재 경로 가져오기
  const pathnames = location.pathname.split('/').filter((x) => x); // ['', 'dashboard', 'list'] -> ['dashboard', 'list']

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      {pathnames.length > 0 ? (
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="body1">Home</Typography>
        </Link>
      ) : (
        <Typography variant="body1" sx={{ color: 'text.primary', fontWeight: 600 }}>
          Home
        </Typography>
      )}

      {pathnames.map((value, index) => {
        const decodedValue = decodeURIComponent(value);
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <Typography
            key={to}
            variant="body1"
            sx={{ color: 'text.primary', fontWeight: 600 }}
          >
            {decodedValue.charAt(0).toUpperCase() + decodedValue.slice(1)}
          </Typography>
        ) : (
          <Link
            key={to}
            to={to}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <Typography variant="body1">
              {decodedValue.charAt(0).toUpperCase() + decodedValue.slice(1)}
            </Typography>
          </Link>
        );
      })}
    </StyledBreadcrumbs>
  );
}
