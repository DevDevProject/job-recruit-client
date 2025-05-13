// BlogHeader.js
import { Box, Typography, IconButton, Chip } from '@mui/material';
import RssFeedRoundedIcon from '@mui/icons-material/RssFeedRounded';
import Search from './Search'; // 기존에 쓰던 컴포넌트
import Header from './Header';
import { useState } from 'react';

export default function BlogHeader({ selectedCategory, setSelectedCategory, searchQuery, setSearchQuery }) {
  
  const categories = ['All', 'Frontend', 'Backend', 'AI', 'Engineering', 'Database'];

  return (
    <div>
      <Header />
      <div>
        <Typography variant="h1" gutterBottom>
          기술 블로그
        </Typography>
        <Typography>여러 기업의 최신 관심사를 찾아보세요.</Typography>
      </div>
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          flexDirection: 'row',
          gap: 1,
          width: { xs: '100%', md: 'fit-content' },
          overflow: 'auto',
        }}
      >
        <Search />
        <IconButton size="small" aria-label="RSS feed">
          <RssFeedRoundedIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row' },
          width: '100%',
          justifyContent: 'space-between',
          alignItems: { xs: 'start', md: 'center' },
          gap: 4,
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'row',
            gap: 3,
            overflow: 'auto',
          }}
        >
          {categories.map((category) => (
            <Chip
              key={category}
              label={category}
              onClick={() => setSelectedCategory(category)}
              size="medium"
              sx={
                selectedCategory === category
                  ? {}
                  : {
                    backgroundColor: 'transparent',
                    border: 'none',
                  }
              }
            />
          ))}

        </Box>
        <Box
          sx={{
            display: { xs: 'none', sm: 'flex' },
            flexDirection: 'row',
            gap: 1,
            width: { xs: '100%', md: 'fit-content' },
            overflow: 'auto',
          }}
        >
          <Search 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </Box>
      </Box>
    </div>
  );
}
