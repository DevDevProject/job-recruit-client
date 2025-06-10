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
import CustomPagination from '../../shared/components/CustomPagination';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function BlogGrid( {cardData, total, limit, page, handlePageChange}) {
  const [focusedCardIndex, setFocusedCardIndex] = React.useState(null);

  

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

      <CustomPagination
        total={total}
        limit={limit}
        page={page}
        handlePageChange={handlePageChange}
      />
    </Grid>
  );
}
