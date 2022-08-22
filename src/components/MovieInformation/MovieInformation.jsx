import React from 'react';
import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  useMediaQuery,
  Rating,
} from '@mui/material';

import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOtlined,
  Remove,
  ArrowBack,
} from '@mui/icons-material';

import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useGetMovieQuery } from '../../services/TMDB';
import useStyles from './styles';

const MovieInformation = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const classes = useStyles();
  console.log(data);

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box displey="flex" justifyContent="center">
        <Link to="/">Something has gone wrong - Go Back</Link>
      </Box>
    );
  }

  return (
    <Grid
      container
      className={classes.containerSpaceAround}
    >
      <Grid
        item
        sm={8}
        lg={4}
      >
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid>
      <Grid
        item
        container
        direction="column"
        lg={7}
      >
        <Typography
          variant="h3"
          align="center"
          gutterBottom
        >
          {data.title}
        </Typography>
        <Grid />
      </Grid>
    </Grid>
  );
};

export default MovieInformation;
