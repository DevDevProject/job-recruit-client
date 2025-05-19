import * as React from 'react';
import PropTypes from 'prop-types';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import axios from 'axios';
import { useEffect, useState} from 'react'
import {
  IndiaFlag,
  UsaFlag,
  BrazilFlag,
  GlobeFlag,
} from '../internals/components/CustomIcons';

const data = [
  { label: 'India', value: 50000 },
  { label: 'USA', value: 35000 },
  { label: 'Brazil', value: 10000 },
  { label: 'Other', value: 5000 },
];

const StyledText = styled('text')(({ theme, variant }) => ({
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fill: (theme.vars || theme).palette.text.secondary,
  fontSize:
    variant === 'primary'
      ? theme.typography.h5.fontSize
      : theme.typography.body2.fontSize,
  fontWeight:
    variant === 'primary'
      ? theme.typography.h5.fontWeight
      : theme.typography.body2.fontWeight,
}));


function PieCenterLabel({ primaryText, secondaryText }) {
  const { width, height, left, top } = useDrawingArea();
  const primaryY = top + height / 2 - 10;
  const secondaryY = primaryY + 24;

  return (
    <React.Fragment>
      <StyledText variant="primary" x={left + width / 2} y={primaryY}>
        {primaryText}
      </StyledText>
      <StyledText variant="secondary" x={left + width / 2} y={secondaryY}>
        {secondaryText}
      </StyledText>
    </React.Fragment>
  );
}

PieCenterLabel.propTypes = {
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string.isRequired,
};

const colors = [
  'hsl(220, 20%, 65%)',
  'hsl(220, 20%, 42%)',
  'hsl(220, 20%, 35%)',
  'hsl(220, 20%, 25%)',
];

const dynamicColors = [
  '#2e7d32', '#1565c0', '#ff9800', '#8e24aa',
  '#f44336', '#607d8b', '#00695c', '#d32f2f',
  '#ee3311', '#12AA8b'
];

export default function ChartStack() {

  const [stacks, setStacks] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/recruit/stack/rank`)
    .then((res) => {
      const withColors = res.data.stacks.map((cat, index) => ({
        ...cat,
        color: dynamicColors[index % dynamicColors.length],
      }));

      setStacks(withColors);
      
      setTotal(res.data.count);
    })
      .catch(err => console.error('카테고리 로딩 실패', err));
  }, []);

  const stackInfo = stacks.map((cat, index) => ({
    ...cat,
    color: dynamicColors[index],
  }));

  function formatNumberShort(value) {
    if (value >= 1_000_000_000) return (value / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
    if (value >= 1_000_000) return (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (value >= 1_000) return (value / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
    return value.toString();
  }  

  return (
    <Card
      variant="outlined"
      sx={{ display: 'flex', flexDirection: 'column', gap: '8px', flexGrow: 1 }}
    >
      <CardContent>
        <Typography component="h2" variant="subtitle2">
          기술 스택 통계
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <PieChart
            colors={dynamicColors}
            margin={{
              left: 80,
              right: 80,
              top: 80,
              bottom: 80,
            }}
            series={[
              {
                data: stacks.map(c => ({ label: c.name, value: c.count })),
                innerRadius: 75,
                outerRadius: 100,
                paddingAngle: 2,
                highlightScope: { faded: 'global', highlighted: 'item' },
              },
            ]}
            height={260}
            width={260}
            slotProps={{
              legend: { hidden: true },
            }}
          >
            <PieCenterLabel
              primaryText={`${total.toLocaleString()}개`}
              secondaryText="총합"
            />
          </PieChart>
        </Box>
        {stacks.map((stack, index) => (
          <Stack
            key={index}
            direction="row"
            sx={{ alignItems: 'center', gap: 2, pb: 2 }}
          >
            <Stack sx={{ gap: 1, flexGrow: 1 }}>
              <Stack
                direction="row"
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: '500' }}>
                  {stack.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {((stack.count / total) * 100).toFixed(1)}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                aria-label="Number of users by country"
                value={(stack.count / total) * 100}
                sx={{
                  [`& .${linearProgressClasses.bar}`]: {
                    backgroundColor: stack.color,
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
