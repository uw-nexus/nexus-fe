import React, { useState } from 'react';
import { IconButton, InputBase, Button, Divider, TextField, Chip } from '@material-ui/core';
import { Box, Grid } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

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
    marginBottom: '1rem'
  },
  
  addButton: {
    minWidth: '100%',
    minHeight: '100%'
  }
}));

const Filters = ({ skills, setSkills, fields, setFields }) => {
  const classes = useStyles();
  
  const [skillEntry, setSkillEntry] = useState('');
  const [fieldEntry, setFieldEntry] = useState('');

  const handleSkillEntry = async (event) => {
    event.preventDefault();
    setSkills(skills => !skillEntry.length || skills.includes(skillEntry) ? skills : [...skills, skillEntry]);
    setSkillEntry('');
  }

  const handleSkillDelete = skillToDelete => () => {
    setSkills(skills => skills.filter(s => s !== skillToDelete));
  };

  const handleFieldEntry = async (event) => {
    event.preventDefault();
    setFields(fields => !fieldEntry.length || fields.includes(fieldEntry) ? fields : [...fields, fieldEntry]);
    setFieldEntry('');
  }

  const handleFieldDelete = fieldToDelete => () => {
    setFields(fields => fields.filter(f => f !== fieldToDelete));
  };

  return (
    <>
      <Box>
        <form onSubmit={handleSkillEntry}>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <TextField
                variant='outlined' label='Skill'
                size='small' fullWidth value={skillEntry}
                onChange={e => setSkillEntry(e.target.value)}
              />
            </Grid>

            <Grid item xs={2}>
              <Button type='submit' variant='contained' color='primary' className={classes.addButton}>+</Button>
            </Grid>

            <Grid container item xs={12} spacing={1} style={{ marginBottom: '2rem' }}>
              {skills.map(s => 
                <Grid item key={s}>
                  <Chip label={s} onDelete={handleSkillDelete(s)} color='primary' />
                </Grid>)}
            </Grid>
          </Grid>
        </form>
      </Box>
      <Box>
        <form onSubmit={handleFieldEntry}>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <TextField
                variant='outlined' label='Field'
                size='small' fullWidth value={fieldEntry}
                onChange={e => setFieldEntry(e.target.value)}
              />
            </Grid>

            <Grid item xs={2}>
              <Button type='submit' variant='contained' color='primary' className={classes.addButton}>+</Button>
            </Grid>

            <Grid container item xs={12} spacing={1} style={{ marginBottom: '2rem' }}>
              {fields.map(s => 
                <Grid item key={s}>
                  <Chip label={s} onDelete={handleFieldDelete(s)} color='primary' />
                </Grid>)}
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}

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

        { focus ? <Divider variant='middle' className={classes.divider} /> : null}
        { focus ? <Filters {...{ skills, setSkills, fields, setFields }} /> : null }
      </Box>
    </Box>
  );
};
