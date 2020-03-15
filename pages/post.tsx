import React, { useState } from 'react';
import Router from 'next/router';
import { Button, TextField, Typography, Grid, IconButton, Chip } from '@material-ui/core';
import { Container, Paper } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import fetch from 'isomorphic-unfetch';

import useStyles from '../static/post/style';
import { checkAuth, redirectPage, formatDateBE } from '../utils';

const PostProjectPage = () => {
  const classes = useStyles();

  const [details, setDetails] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: ''
  });

  const [skillEntry, setSkillEntry] = useState('');
  const [fieldEntry, setFieldEntry] = useState('');
  const [skills, setSkills] = useState([]);
  const [fields, setFields] = useState([]);

  const handleChangeDetails = (name) => (event) => {
    setDetails({
      ...details,
      [name]: event.target.value
    });
  };

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

  const handleProfileUpdate = async (event) => {
    event.preventDefault();

    try {
      details.startDate = formatDateBE(details.startDate);
      details.endDate = formatDateBE(details.endDate);
    } catch {
      details.startDate = '';
      details.endDate = '';
    }

    const res = await fetch(`${process.env.BE_ADDR}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(details)
    });

    const { projectId } = await res.json();
    
    await fetch(`${process.env.BE_ADDR}/projects/${projectId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ fields, skills })
    });

    Router.push('/');
  }

  return (
    <Container component='main' maxWidth='xs' className={classes.outer}>
      <Paper elevation={2} className={classes.paper}>
        <Grid container style={{ marginBottom: '1.5rem' }}>
          <Grid item xs={2}>
            <IconButton onClick={() => Router.back()} style={{ padding: 0 }}>
              <ArrowBack fontSize='large' />
            </IconButton>
          </Grid>
          <Grid item container xs={8} alignItems='center' justify='center'>
            <Typography component='h1' variant='h5'>
              Create Project
            </Typography>
          </Grid>
        </Grid>

        <TextField
          variant='outlined' margin='normal'
          id='project-title' name='project-title'
          label='Title'
          fullWidth autoFocus
          onChange={handleChangeDetails('title')}
        />

        <Grid container spacing={2} justify='space-between'>
          <Grid item xs={6}>
            <TextField
              variant='outlined' margin='normal'
              id='project-start' name='project-start'
              label='Start Date' fullWidth
              onChange={handleChangeDetails('startDate')}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant='outlined' margin='normal'
              id='project-end' name='project-end'
              label='End Date' fullWidth
              onChange={handleChangeDetails('endDate')}
            />
          </Grid>
        </Grid>

        <TextField
          variant='outlined' margin='normal'
          id='project-desc' name='project-desc'
          label='Description'
          fullWidth multiline rows='5'
          onChange={handleChangeDetails('description')}
        />

        <form className={classes.chipBox} onSubmit={handleSkillEntry}>
          <Grid container justify='space-between'>
            <Grid item xs={9}>
              <TextField id='project-skills' 
                placeholder='Skills Required'
                value={skillEntry}
                onChange={e => setSkillEntry(e.target.value)}
                />
            </Grid>
            <Grid item xs={2}>
              <Button type='submit' variant='contained' color='primary' className={classes.addButton}>+</Button>
            </Grid>
          </Grid>
          
          <Grid
            container spacing={1} 
            style={{ margin: 0, paddingTop: (skills.length ? '1rem' : 0) }}
            justify={skills.length ? 'flex-start' : 'center'}
            alignItems={skills.length ? 'flex-start' : 'center'}
            >
            {skills.map(s => <Grid item key={s}><Chip label={s} onDelete={handleSkillDelete(s)} color='primary' /></Grid>)}
          </Grid>
        </form>

        <form className={classes.chipBox} onSubmit={handleFieldEntry}>
          <Grid container justify='space-between'>
            <Grid item xs={9}>
              <TextField id='project-fields' 
                placeholder='Fields of Interest'
                value={fieldEntry}
                onChange={e => setFieldEntry(e.target.value)}
                />
            </Grid>
            <Grid item xs={2}>
              <Button type='submit' variant='contained' color='primary' className={classes.addButton}>+</Button>
            </Grid>
          </Grid>
          
          <Grid
            container spacing={1}
            style={{ margin: 0, paddingTop: (fields.length ? '1rem' : 0) }}
            justify={fields.length ? 'flex-start' : 'center'}
            alignItems={fields.length ? 'flex-start' : 'center'}
            >
            {fields.map(s => <Grid item key={s}><Chip label={s} onDelete={handleFieldDelete(s)} color='primary' /></Grid>)}
          </Grid>
        </form>
        
        <Button fullWidth variant='contained' color='primary' className={classes.submit} onClick={handleProfileUpdate}>
          CREATE
        </Button>
      </Paper>
    </Container>
  );
}

PostProjectPage.getInitialProps = async (ctx) => {
  const { authenticated } = await checkAuth(ctx);
  if (!authenticated) redirectPage(ctx, '/login');
  // TODO: fetch available db options from backend and return as props
  return { authenticated };
}

export default PostProjectPage;
