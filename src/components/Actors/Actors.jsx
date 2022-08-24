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
import { useGetActorsDetailsQuery, useGetMoviesByActorsIdQuery } from '../../services/TMDB';
import useStyles from './styles';
import { MovieList, Pagination } from '..';

const Actors = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);

  const history = useHistory();
  const { data, isFetching, error } = useGetActorsDetailsQuery(id);
  const { data: movies } = useGetMoviesByActorsIdQuery({ id, page });
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
        <Grid
          item
          lg={7}
          xl={8}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="h2"
            gutterBottom
          >
            {data?.name}
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
          >
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography
            variant="body1"
            gutterBottom
            align="justify"
            paragraph
          >
            {data?.biography || 'Nothing interesting here...hmmm'}
          </Typography>
          <Box
            marginTop="2rem"
            display="flex"
            justifyContent="space-around"
          >
            <Button
              variant="contained"
              color="primary"
              target="_blank"
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
            >
              IMDB
            </Button>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => history.goBack()}
            >
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin="2rem 0">
        <Typography
          variant="h2"
          gutterBottom
          align="center"
        >
          Movies
        </Typography>
        { movies && (
        <MovieList
          movies={movies}
          numberOfMovies={12}
        />
        )}
        <Pagination
          currentPage={page}
          setPage={setPage}
          totalPages={movies.total_pages}
        />
      </Box>
    </>
  );
};

export default Actors;
