import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { alpha } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import BlogHeader from '../dashboard/components/BlogHeader';
import BlogGrid from '../dashboard/components/BlogGrid';
import axios from 'axios';
import { stacks } from '../commons/data/RecruitOptions';
import MetaTag from '../shared/components/MetaTag';

export function Search() {
  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </FormControl>
  );
}

export default function Blogs(props) {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');

  const [cardData, setCardData] = React.useState([])
  const [page, setPage] = React.useState(1)
  const [limit, setLimit] = React.useState(10)
  const [total, setTotal] = React.useState(0)

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const getPageCount = () => {
    if(total % limit == 0)
        return total / limit
    return total / limit + 1
  }

  React.useEffect(() => {
    const params = {
      page: page,
      limit: limit,
      category: selectedCategory,
    }

    if (searchQuery)
      params.search = searchQuery

    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/blog/blogs`, { params })
      .then((res) => {
        setCardData(res.data.blogs)
        setTotal(res.data.total_count)
      })
      .catch((err) => {
        console.log("data loading failed", err);
      })
  }, [page, searchQuery, selectedCategory])

  return (
    <>
      <Box sx={{ display: 'flex', mt: 11 }}>
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <BlogHeader 
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
              
              <Typography component="h2" variant="h6" sx={{textAlign: 'left'}}>
                총 {" "}
                <Box component="span" sx={{ color: 'success.main', fontWeight: 600 }}>
                  {total.toLocaleString()}
                </Box>
                개
              </Typography>
              
              
              <BlogGrid 
                cardData={cardData}
                total={total}
                limit={limit}
                page={page}
                handlePageChange={handlePageChange}
              />
            </Box>
          </Stack>
        </Box>
      </Box>
      <MetaTag
        title='기술 블로그 - AllDevHub'
        description={stacks}
        keywords={stacks}
        image="https://alldevhub.com/assets/preview.png"
        url="https://alldevhub.com"
      />
    </>
  );
}