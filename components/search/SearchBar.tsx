import React, { useState } from 'react';
import { IconButton, InputBase, Button } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import Filters from './Filters';
import { BE_ADDR } from 'utils';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 10,
  },

  backdrop: {
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  searchContainer: {
    padding: '1rem',
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
  },

  searchBar: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: theme.palette.grey[300],
    borderRadius: theme.spacing(0.5),
  },

  searchInput: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },

  iconButton: {
    padding: 10,
  },

  cancel: {
    padding: 0,
    marginLeft: '.5rem',
  },
}));

export default ({ setProjects }): JSX.Element => {
  const classes = useStyles();

  const [title, setTitle] = useState('');
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [focus, setFocus] = useState(false);

  const handleSearch = async (event): Promise<void> => {
    event.preventDefault();

    const res = await fetch(`${BE_ADDR}/projects/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        filters: {
          details: { title },
          skills,
          interests,
        },
      }),
    });

    if (res.ok) {
      const projects = await res.json();
      setProjects(projects);
      setFocus(false);
    }
  };

  return (
    <Box className={`${classes.wrapper} ${focus ? classes.backdrop : ''}`}>
      <Box className={classes.searchContainer}>
        <Box display="flex">
          <form className={classes.searchBar} onSubmit={handleSearch}>
            <InputBase
              className={classes.searchInput}
              placeholder="Search"
              onChange={(e): void => setTitle(e.target.value)}
              onFocus={(): void => setFocus(true)}
            />

            <IconButton type="submit" aria-label="Search" className={classes.iconButton}>
              <Search />
            </IconButton>
          </form>

          {focus ? (
            <Button aria-label="Cancel" disableRipple className={classes.cancel} onClick={(): void => setFocus(false)}>
              Cancel
            </Button>
          ) : null}
        </Box>

        {focus ? <Filters {...{ skills, setSkills, interests, setInterests }} /> : null}
      </Box>
    </Box>
  );
};
