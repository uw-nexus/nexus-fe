import React, { useState } from 'react';
import { IconButton, InputBase, Button, Divider } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import ArrayForm from '../components/ArrayForm';

const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'fixed',
    width: '100%',
    top: 0,
    zIndex: 10
  },

  backdrop: {
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },

  searchContainer: {
    padding: '1rem',
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
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
  },

  cancel: {
    padding: 0,
    marginLeft: '.5rem'
  },

  divider: {
    marginTop: '1rem',
    marginBottom: '.5rem'
  }
}));

const Filters = ({ skills, setSkills, fields, setFields }) => {
  const classes = useStyles();

  return (
    <>
      <Divider variant='middle' className={classes.divider} />
      <ArrayForm label='Skill' items={skills} setItems={setSkills} />
      <ArrayForm label='Field' items={fields} setItems={setFields} />
    </>
  );
};

export default ({ setProjects }) => {
  const classes = useStyles();
  
  const [title, setTitle] = useState('');
  const [skills, setSkills] = useState([]);
  const [fields, setFields] = useState([]);
  const [focus, setFocus] = useState(false);

  const handleSearch = async event => {
    event.preventDefault();

    const res = await fetch(`${process.env.BE_ADDR}/projects/search`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        filters: {
          details: { title },
          skills,
          fields
        }
      })
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
        <Box display='flex'>
          <form className={classes.searchBar} onSubmit={handleSearch}>
            <InputBase
              className={classes.searchInput}
              placeholder='Search'
              onChange={e => setTitle(e.target.value)}
              onFocus={() => setFocus(true)}
            />

            <IconButton type='submit' className={classes.iconButton}>
              <Search />
            </IconButton>
          </form>

          { focus
            ? <Button disableRipple className={classes.cancel} onClick={() => setFocus(false)}>
                Cancel
              </Button>
            : null}
        </Box>

        { focus ? <Filters {...{ skills, setSkills, fields, setFields }} /> : null }
      </Box>
    </Box>
  );
};
