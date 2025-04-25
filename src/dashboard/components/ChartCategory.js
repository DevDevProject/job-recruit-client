import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { PieChart } from '@mui/x-charts';
import { useDrawingArea } from '@mui/x-charts/hooks';

import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { a } from '@react-spring/web';

const StyledText = styled('text', {
  shouldForwardProp: (prop) => prop !== 'variant',
})(({ theme }) => ({
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fill: (theme.vars || theme).palette.text.secondary,
}));

function PieCenterLabel({ primaryText, secondaryText }) {
  const { width, height, left, top } = useDrawingArea();
  const primaryY = top + height / 2 - 10;
  const secondaryY = primaryY + 24;

  return (
    <>
      <StyledText x={left + width / 2} y={primaryY}>
        {primaryText}
      </StyledText>
      <StyledText x={left + width / 2} y={secondaryY}>
        {secondaryText}
      </StyledText>
    </>
  );
}

PieCenterLabel.propTypes = {
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string.isRequired,
};

const dynamicColors = [
  '#2e7d32', '#1565c0', '#ff9800', '#8e24aa',
  '#f44336', '#607d8b', '#00695c', '#d32f2f',
  '#ee3311', '#12AA8b'
];

export default function ChartCategory() {
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/category/rank`)
    .then((res) => {
      const withColors = res.data.map((cat, index) => ({
        ...cat,
        color: dynamicColors[index % dynamicColors.length],
      }));

      setCategories(withColors);

      const totalCount = res.data.reduce((sum, item) => sum + item.count, 0);
      setTotal(totalCount);
    })
      .catch(err => console.error('카테고리 로딩 실패', err));
  }, []);


  const categoryInfo = categories.map((cat, index) => ({
    ...cat,
    color: dynamicColors[index],
  }));

  return (
    <Card
      variant="outlined"
      sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}
    >
      <CardContent>
        <Typography component="h2" variant="subtitle2" sx={{ mb: 2 }}>
          카테고리 통계
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <PieChart
            colors={dynamicColors}
            margin={{ left: 80, right: 80, top: 80, bottom: 80 }}
            series={[
              {
                data: categoryInfo.map(c => ({ label: c.name, value: c.count })),
                innerRadius: 75,
                outerRadius: 100,
                paddingAngle: 2,
                highlightScope: { faded: 'global', highlighted: 'item' },
              },
            ]}
            height={260}
            width={260}
            slotProps={{ legend: { hidden: true } }}
          >
            <PieCenterLabel
              primaryText={`${categories.reduce((sum, s) => sum + s.count, 0)}개`}
              secondaryText="총합"
            />
          </PieChart>
        </Box>

        {categoryInfo.map((category, index) => (
          <Stack key={index} direction="row" sx={{ alignItems: 'center', gap: 2, pb: 2 }}>
            <Stack sx={{ gap: 1, flexGrow: 1 }}>
              <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {category.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {category.count}개
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={(category.count / total) * 100}
                sx={{
                  [`& .${linearProgressClasses.bar}`]: {
                    backgroundColor: category.color,
                  },
                }}
              />
            </Stack>
          </Stack>
        ))}
      </CardContent>
    </Card>
  );
}
