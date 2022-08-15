import React, { useEffect } from 'react';

import { Box, Divider, List, ListItem, ListItemtext, ListSubheader, LIstItemIcon, box, circularProgress, ListItemIcon, ListItemText, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useGetGenresQuery } from '../../services/TMDB';
import useStyles from './styles';
import genreIcons from '../../assets/genres';
import genres from '../../assets/genres';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

const blackLogo = 'https://fontmeme.com/permalink/220814/1a389506638457580aa289d715817414.png';
const blueLogo = 'https://fontmeme.com/permalink/220814/5fa78b111a734628933cfce7731e7751.png';

const Sidebar = ({ setMobileOpen }) => {
  const theme = useTheme();
  const classes = useStyles();
  const { data, error, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();

  const categories = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcoming', value: 'upcoming' },
  ];

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === 'light' ? blackLogo : blueLogo}
          alt="Cinemateka logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        { categories.map(({ label, value }) => (
          <Link
            key={value}
            className={classes.links}
            to="/"
          >
            <ListItem
              onClick={() => dispatch(selectGenreOrCategory(value))}
              button
            >
              <ListItemIcon>
                <img
                  src={genreIcons[label.toLowerCase()]}
                  className={classes.genreImage}
                  height={30}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        { isFetching ? (
          <Box
            display="flex"
            justifyContent="center"
          >
            <CircularProgress />
          </Box>
        ) : data.genres.map(({ name, id }) => (
          <Link
            key={name}
            className={classes.links}
            to="/"
          >
            <ListItem
              onClick={() => dispatch(selectGenreOrCategory(id))}
              button
            >
              <ListItemIcon>
                <img
                  src={genreIcons[name.toLowerCase()]}
                  className={classes.genreImage}
                  height={30}
                />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
};

export default Sidebar;
