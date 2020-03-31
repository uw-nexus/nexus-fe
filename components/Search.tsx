import React, { useState } from 'react';
import { IconButton, InputBase, Box } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  searchContainer: {
    position: 'fixed',
    top: 0,
    width: '100%',
    padding: '1rem',
    backgroundColor: 'white',
    boxShadow: '0 2px 3px rgba(0,0,0,0.2)',
    zIndex: 10
  },

  searchBar: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: theme.palette.grey[300],
    borderRadius: theme.spacing(.5)
  },

  searchInput: {
    marginLeft: theme.spacing(1),
    flex: 1
  },

  iconButton: {
    padding: 10
  }
}));

export default ({ setProjects }) => {
  const classes = useStyles();
  const [search, setSearch] = useState('');

  const handleSearch = async event => {
    event.preventDefault();

    const res = await fetch(`${process.env.BE_ADDR}/projects/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        filters: {
          details: {
            title: search
          }
        }
      })
    });

    if (res.ok) {
      const projects = await res.json();
      setProjects(projects);
    }
  };

  return (
    <Box className={classes.searchContainer}>
      <form className={classes.searchBar} onSubmit={handleSearch}>
        {/* <IconButton className={classes.iconButton} aria-label='menu'>
          <Menu />
        </IconButton> */}

        <InputBase
          className={classes.searchInput}
          placeholder='Search'
          onChange={e => setSearch(e.target.value)}
        />

        <IconButton type='submit' className={classes.iconButton}>
          <Search />
        </IconButton>
      </form>
    </Box>
  );
};
