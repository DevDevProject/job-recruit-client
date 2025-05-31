import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

export default function CompanyHeader({ company, options }) {
  const navigate = useNavigate()

  return (
    <Stack spacing={2}
      sx={{
        width: '100%',
        textAlign: 'start',
        mb: '50px'
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <IconButton aria-label="expand row" size="small">
          <img
            src={company.logo ?? "/company_logo.png"}
            alt={company.name + " logo"}
            style={{
              width: 50,
              height: 50,
              objectFit: "cover",
              borderRadius: "12px",
            }}
          />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate(`/company/${options.url}`)}
        >
          {company.name}
        </Typography>
      </Stack>

      <Typography variant="h2">{options.title}</Typography>
      <Typography
        variant="h6"
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '4px 8px',
          borderRadius: '6px',
          color: 'success.main'
        }}
      >
        <CalendarMonthIcon fontSize="small" sx={{ mr: 0.5 }} />
        마감일: {options.deadline}
      </Typography>
      <Box
        sx={{
          borderRadius: 2,
          boxShadow: 3,
          backdropFilter: 'blur(80px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: theme => `1px solid ${theme.palette.divider}`,
          p: 3,
          width: '100%',
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {[
          { label: '경력', value: options.experience },
          { label: '지역', value: company.location },
          { label: '고용 타입', value: options.type },
          { label: '직군', value: options.category },
        ].map((item) => (
          <Box
            key={item.label}
            sx={{
              display: 'flex',
              width: '100%',
              justifyContent: 'flex-start',
              alignItems: 'baseline',
            }}
          >
            <Box
              sx={{
                minWidth: '100px',
                fontWeight: 500,
                color: 'text.secondary',
                fontSize: '1.25rem',
              }}
            >
              {item.label}
            </Box>
            <Typography
              variant="h5"
              sx={{ color: 'text.primary', fontWeight: 400 }}
            >
              {item.value}
            </Typography>
          </Box>
        ))}
      </Box>
    </Stack>
  );
}