import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Chip, Stack, Grid, Box, Avatar } from '@mui/material';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { data, useNavigate } from 'react-router-dom';

// --- RecruitPost 컴포넌트 시작 ---

// 스타일링된 Box 컴포넌트 (선택 사항: 전체 카드의 배경색 및 그림자)
const CardWrapper = styled(Card)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
  transition: 'box-shadow 0.3s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

export default function RecruitPost({
  row,
  maxTechStacks = 5,
}) {
  const [showAllStacks, setShowAllStacks] = useState(false);

  const displayedTechStacks = showAllStacks ? row.stacks : row.stacks.slice(0, maxTechStacks);
  const remainingTechStacksCount = row.stacks.length - maxTechStacks;

  const handleShowAllStacks = (e) => {
    e.stopPropagation();
    setShowAllStacks(true);
  };

  return (
    <CardWrapper
      sx={{
        width: '100%'
      }}
    >
      <CardContent>
        <Grid container spacing={1} alignItems="center">
          {/* 회사 정보 */}
          <Grid
            item
            xs={12}
            sx={{
              width: '100%'
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" sx={{ maxWidth: '100%' }}>
              <Avatar
                variant='square'
                src={row.logo_url ?? "/company_logo.png"}
                alt={`${row.company}`}
                sx={{
                  width: 40, height: 40, img: {
                    objectFit: 'contain',
                  }
                }}

              />
              <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                {row.company}
              </Typography>
            </Stack>
          </Grid>
          <Grid
            item xs={12}
            sx={{
              width: '100%'
            }}
          >
            <Typography variant="h5" component="h2" sx={{ mt: 1, mb: 1, textAlign: 'start' }}>
              {row.title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                <Box component="span" sx={{ fontWeight: 'bold' }}>마감일:</Box> {row.deadline}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <Box component="span" sx={{ fontWeight: 'bold' }}>경력:</Box> {row.work_experience}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <Box component="span" sx={{ fontWeight: 'bold' }}>고용:</Box> {row.type}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}
            sx={{
              width: '100%'
            }}
          >
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {displayedTechStacks.map((tech, index) => (
                <Chip key={index} label={tech} size="small" variant="outlined" />
              ))}
              {!showAllStacks && remainingTechStacksCount > 0 && (
                <Chip
                  label={`+${remainingTechStacksCount}`}
                  size="small"
                  variant="filled"
                  color="primary"
                  onClick={handleShowAllStacks}
                  sx={{ cursor: 'pointer' }}
                />
              )}
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </CardWrapper>
  );
}