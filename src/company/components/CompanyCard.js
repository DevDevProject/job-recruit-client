import { Card, CardContent, Stack, Typography, Box, IconButton } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CompanyCard = ( { row } ) => {
  const navigate = useNavigate();

  return (
    <Card
      variant="outlined"
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: 2,
        borderRadius: 2,
        boxShadow: 2,
        transition: '0.2s',
        '&:hover': {
          boxShadow: 4,
        },
        maxWidth: 600,
        margin: '12px auto',
      }}
    >
      <IconButton aria-label="expand row" size="small">
          <img
            src={row.logo_url ?? "/company_logo.png"}
            alt={row.name ?? "undefined" + " logo"}
            style={{
              width: 50,
              height: 50,
              objectFit: "cover",
              borderRadius: "12px",
            }}
          />
        </IconButton>

      <CardContent sx={{ padding: 0 }}>
        <Typography
          variant="h6"
          sx={{ cursor: 'pointer', fontWeight: 600, textAlign: 'start' }}
          onClick={() => navigate(`/company/${row.name}`)}
        >
          {row.name ?? "undefined"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {row.size ?? '기타'} · {row.industry ?? '기타'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
