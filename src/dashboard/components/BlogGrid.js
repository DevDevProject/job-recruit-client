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
import Pagination from '@mui/material/Pagination';

import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from '../theme/customizations';
import BlogCard from './BlogCard';
import Header from './Header';
import axios from 'axios';
import Latest from './Latest';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function BlogGrid() {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);

  const [cardData, setCardData] = React.useState([])
  const [page, setPage] = React.useState(1)
  const [limit, setLimit] = React.useState(10)
  const [total, setTotal] = React.useState(0)

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const getPageCount = () => {
    if(total % limit == 0)
        return total / limit
    return total / limit + 1
  }

  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_BLOG_SERVER_URL}/blogs`, {
      params: {
        page: page,
        limit: limit
      }
    })
      .then((res) => {
        console.log("success", res)
        setCardData(res.data.blogs)
        setTotal(res.data.total)
      })
      .catch((err) => {
        console.log("data loading failed", err);
      })
  }, [page])

  const handleFocus = (index) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  return (
    <Grid container spacing={2} columns={12}>
      {
        cardData.map((card) => (
          <BlogCard
            img={card.thumbnail}
            category={card.category}
            url={card.url}
            title={card.title}
            description={card.description}
            author={card.company}
            date={card.create_date}
            focusedCardIndex={focusedCardIndex}
            handleBlur={handleBlur}
            handleFocus={handleFocus}
          />
        ))
      }
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', pt: 4, width: '100%' }}>
        <Pagination
          count={Math.ceil(total / limit)}
          page={page}
          onChange={handlePageChange}
          boundaryCount={3}
          showFirstButton
          showLastButton
        />
      </Box>

    </Grid>
  );
}
