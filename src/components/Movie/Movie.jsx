import React from 'react';
import { Typography, Grid, Grow, Tooltip, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const Movie = ({ movie, idx }) => {
  const classes = useStyles();
  console.log(movie, idx);
  return (
    <Grid
      item
      xs={12}
      md={6}
      sm={4}
      lg={3}
      xl={2}
      className={classes.movie}
    >
      <Typography
        className={classes.title}
        variant="h5"
      >
        {movie.title}
      </Typography>
    </Grid>
  );
};

export default Movie;
