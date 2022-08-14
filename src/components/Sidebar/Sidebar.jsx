import React, { useEffect } from 'react';
import { Divider, List, ListItem, ListItemtext, ListSubheader, LIstItemIcon, box, circularProgress, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import { PeopleOutlineSharp } from '@mui/icons-material';
import useStyles from './styles';

// const redLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
// const blueLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';
const blackLogo = 'https://fontmeme.com/permalink/220814/1a389506638457580aa289d715817414.png';
const blueLogo = 'https://fontmeme.com/permalink/220814/5fa78b111a734628933cfce7731e7751.png';

const Sidebar = ({ setMobileOpen }) => {
  const theme = useTheme();
  const classes = useStyles();

  const categories = [
    { label: 'Popular', value: 'popular' },
    { label: 'Top Rated', value: 'top_rated' },
    { label: 'Upcaming', value: 'uncoming' },
  ];
  const demoCategories = [
    { label: 'Comedy', value: 'comedy' },
    { label: 'Action', value: 'action' },
    { label: 'Horror', value: 'horror' },
    { label: 'Animation', value: 'animation' },
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
              onClick={() => {}}
              button
            >
              {/* <ListItemIcon>
                <img
                  src={blueLogo}
                  className={classes.genreImage}
                  height={30}
                />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        { demoCategories.map(({ label, value }) => (
          <Link
            key={value}
            className={classes.links}
            to="/"
          >
            <ListItem
              onClick={() => {}}
              button
            >
              {/* <ListItemIcon>
                <img
                  src={blueLogo}
                  className={classes.genreImage}
                  height={30}
                />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
};

export default Sidebar;
