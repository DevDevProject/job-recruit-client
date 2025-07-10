import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function contact(props) {
  return (
    <Typography
      variant="body2"
      align="center"
      {...props}
      sx={[
        {
          color: 'text.secondary',
          mt: 0.5,
          mb: 2
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      {'contact: '}
      <Link color="inherit">
        alldevhub99@gmail.com
      </Link>{' '}
    </Typography>
  );
}
