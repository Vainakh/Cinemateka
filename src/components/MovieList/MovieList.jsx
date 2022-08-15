import React from 'react';
import { Grid } from '@mui/material';
import { Movie } from '..';
import useStyles from './styles';

const MovieList = ({ movies }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.movieContainer}>
      {movies.results.map((movie, i) => (
        <Movie
          key={i}
          movie={movie}
          index={i}
        />
      ))};
    </Grid>
  );
};

export default MovieList;
