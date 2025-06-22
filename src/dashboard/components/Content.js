import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import SettingsSuggestRoundedIcon from '@mui/icons-material/SettingsSuggestRounded';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { SitemarkIcon } from './CustomIcons';

const items = [
  {
    icon: <NotificationsActiveIcon sx={{ color: 'text.secondary' }} />,
    title: '새 소식 알림',
    description:
      '새로운 채용 소식이나 인기 블로그가 등록되면 즉시 알려드립니다!',
  },
  {
    icon: <ConstructionRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: '개발 트렌드 팔로우',
    description:
      '내가 팔로우하는 기술의 최신 채용 동향과 블로그 콘텐츠를 한눈에 확인하세요!',
  },
  {
    icon: <ThumbUpAltRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: '맞춤 추천 받기',
    description:
      '내 기술 스택과 관심 분야에 맞는 채용 공고와 블로그 글을 자동으로 추천해드립니다!',
  },
  {
    icon: <AutoFixHighRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: '즐겨찾기와 맞춤 추천',
    description:
      '관심 기업과 기술 스택을 기반으로 개인 맞춤형 채용 정보와 블로그를 추천해 드립니다!',
  },
];

export default function Content() {
  return (
    <Stack
      sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450 }}
    >
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        <SitemarkIcon />
      </Box>
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'start' }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}