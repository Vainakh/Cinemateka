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
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
} from '@mui/icons-material';

import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { MovieList } from '..';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import genreIcons from '../../assets/genres';
import { useGetMovieQuery, useGetRecommendationsQuery } from '../../services/TMDB';
import useStyles from './styles';

const MovieInformation = () => {
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: recommendations, isFetching: isRecommendationsFetching } = useGetRecommendationsQuery({ list: '/recommendations', movie_id: id });
  const classes = useStyles();
  const dispatch = useDispatch();
  const isMoviefavorited = true;
  const isMovieWatchlisted = false;

  const addToFavorites = () => {};
  const addToWatchlist = () => {};

  console.log(recommendations);
  // console.log(data);

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
          {data?.title} ({data?.release_date.split('-')[0]})
        </Typography>
        <Typography
          variant="h5"
          align="center"
          gutterBottom
        >
          {data?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating
              readOnly
              value={data?.vote_average / 2}
            />
            <Typography
              variant="subtitle1"
              gutterBottom
              style={{ marginLeft: '10px' }}
            >
              { (data?.vote_average / 2).toFixed(1) } / 10
            </Typography>
          </Box>
          <Typography
            variant="h6"
            align="center"
            gutterBottom
          >
            {data?.runtime}min {data?.spoken_languages.length > 0 ? `${data?.spoken_languages[0].english_name}` : ''}
          </Typography>
        </Grid>
        <Grid
          item
          className={classes.genresContainer}
        >
          {data?.genres.map((genre) => (

            <Link
              key={genre.name}
              className={classes.links}
              to="/"
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
            >
              <img
                src={genreIcons[genre.name.toLowerCase()]}
                className={classes.genreImage}
                height={30}
              />
              <Typography
                color="textPrimary"
                variant="subtitle1"
                style={{ textDecoration: 'none' }}
              >
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography
          variant="h5"
          gutterBottom
          style={{ marginTop: '10px' }}
        >
          Overview
        </Typography>
        <Typography
          style={{ marginBottom: '2rem' }}
        >
          { data?.overview }
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
        >
          Top Cast
        </Typography>
        <Grid
          item
          container
          spacing={2}
        >
          {data && data.credits?.cast?.map((character, i) => (
            character.profile_path
              && (
              <Grid
                key={i}
                item
                xs={4}
                md={2}
                component={Link}
                to={`/actors/${character.id}`}
                style={{ textDecoration: 'none' }}
              >
                <img
                  className={classes.castImage}
                  src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                  alt={character.name}
                />
                <Typography
                  color="textPrimary"
                >
                  {character?.name}
                </Typography>
                <Typography
                  color="textSecondary"
                >
                  {character?.character.split('/')[0]}
                </Typography>
              </Grid>
              )
          )).slice(0, 6)}
        </Grid>

        <Grid
          item
          container
          style={{ marginTop: '2rem' }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            className={classes.buttonsContainer}
          />
          <ButtonGroup
            size="medium"
            variant="outlined"
          >
            <Button
              targat="_blank"
              ref={['noopener', 'noreferrer']}
              href={data?.homepage}
              endIcon={<Language />}
            >
              Website
            </Button>
            <Button
              targat="_blank"
              ref={['noopener', 'noreferrer']}
              href={`https://www.imdb.com/title/${data?.imdb_id}`}
              endIcon={<MovieIcon />}
            >
              IMDB
            </Button>
            <Button
              onClick={() => {}}
              href="#"
              endIcon={<Theaters />}
            >
              Trailer
            </Button>
          </ButtonGroup>
        </Grid>

        <Grid
          item
          container
          style={{ marginTop: '2rem' }}

        >

          <Grid
            className={classes.buttonsContainer}
            item
            xs={12}
            sm={6}

          />
          <ButtonGroup
            size="small"
            variant="outlined"
          >
            <Button
              onClick={addToFavorites}
              endIcon={isMoviefavorited ? <FavoriteBorderOutlined /> : <Favorite />}
            >
              {isMoviefavorited ? 'Unfavorite' : 'Favorite'}
            </Button>

            <Button
              onClick={addToWatchlist}
              endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
            >
              Watchlist
            </Button>

            <Button
              endIcon={<ArrowBack />}
              sx={{ borderColor: 'primary.main' }}
            >
              <Typography
                component={Link}
                to="/"
                color="inherit"
                variant="subtitle2"
                style={{ textDecoration: 'none' }}
              >
                Back
              </Typography>
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
      <Box
        marginTop="5rem"
        width="100%"
      >

        <Typography
          variant="h3"
          gutterBottom
          align="center"
        >
          You might also like:
        </Typography>
        {recommendations ? <MovieList movies={recommendations} numberOfMovies={12} /> : 'Sorry, nothing was found!'}
      </Box>
    </Grid>
  );
};

export default MovieInformation;
