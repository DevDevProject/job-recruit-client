// BlogCard.js
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import { styled } from '@mui/system';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Grid from '@mui/material/Grid';
import dayjs from 'dayjs';
import axios from 'axios';

const SyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: (theme.vars || theme).palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
  '&:focus-visible': {
    outline: '3px solid',
    outlineColor: 'hsla(210, 98%, 48%, 0.5)',
    outlineOffset: '2px',
  },
}));

const SyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
  '&:last-child': {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

function Author({ author, date }: { author: { name: string; avatar: string }, date: string; }) {
    return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
            <Avatar alt={author.name} src={author.image} sx={{ width: 24, height: 24 }} />
            <Typography variant="caption">{author.name}</Typography>
          </Box>
          <Typography variant="caption">{dayjs(date).format('YYYY.MM.DD')}</Typography>
        </Box>
      );
  }

export default function BlogCard({ id, img, category, url, title, description, author, date, focusedCardIndex, handleFocus, handleBlur }) {
  const handleClick = () => {
    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/blog/popular?id=${id}`, {})
    .catch(err => console.log(err));
    window.open(url, '_blank');
  };

  return (
    <Grid size={{ xs: 12, md: 6 }} onClick={() => handleClick()}>
        <SyledCard
          variant="outlined"
          onFocus={() => handleFocus(1)}
          onBlur={handleBlur}
          tabIndex={0}
          className={focusedCardIndex === 1 ? 'Mui-focused' : ''}
        >
          <CardMedia
            component="img"
            alt="green iguana"
            image={img}
            aspect-ratio="16 / 9"
            sx={{
              aspectRatio: '16 / 9',
              width: '100%',
              objectFit: 'cover',
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          />
          <SyledCardContent>
            <Typography gutterBottom variant="caption" component="div">
              ( {category} )
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              {title}
            </Typography>
            <StyledTypography variant="body2" color="text.secondary" gutterBottom>
              {description}
            </StyledTypography>
          </SyledCardContent>
          <Author author={author} date={date} />
        </SyledCard>
      </Grid>
  );
}
