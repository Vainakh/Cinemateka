import React, { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Grid } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import {
  useHistory,
  useParams,
} from 'react-router-dom';
import { useGetActorsDetailsQuery } from '../../services/TMDB';
import useStyles from './styles';

const Actors = () => {
  const { id } = useParams();

  const history = useHistory();
  const { data, isFetching, error } = useGetActorsDetailsQuery(id);
  console.log(data);
  const classes = useStyles();

  if (isFetching) {
    return (
      <Box
        display="flex"
        justifyContent="center"
      >
        <CircularProgress sixe="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Button
          startIcon={<ArrowBack />}
          onClick={() => history.goBack()}
          color="primary"
        >
          Go Back
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          lg={5}
          xl={4}
        >
          <img
            className={classes.image}
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            alt={data.name}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Actors;
