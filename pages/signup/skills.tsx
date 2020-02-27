import React, { useState } from 'react';
import Router from 'next/router';
import { Button, TextField, Typography, Chip } from '@material-ui/core';
import { Container, Paper, Grid } from '@material-ui/core';
import fetch from 'isomorphic-unfetch';

import useStyles from '../../static/auth/style';
import { checkAuth, redirectPage } from '../../utils';

const SkillsSignup = () => {
  const classes = useStyles();

  const [skillEntry, setSkillEntry] = useState('');
  const [skills, setSkills] = useState([]);

  const handleSkillEntry = async (event) => {
    event.preventDefault();
    setSkills(skills => !skillEntry.length || skills.includes(skillEntry) ? skills : [...skills, skillEntry]);
    setSkillEntry('');
  }

  const handleDelete = (skillToDelete) => () => {
    setSkills(skills => skills.filter(s => s !== skillToDelete));
  };

  const updateSkills = async (event) => {
    event.preventDefault();

    await fetch(`${process.env.BE_ADDR}/students`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ student: { skills } })
    });

    Router.push('/');
  }

  return (
    <Container component='main' maxWidth='xs' className={classes.outer}>
      <Paper elevation={2} className={classes.paper}>
        <Typography component='h1' variant='h5'>
          {'Skills & Tools'}
        </Typography>
        
        <form className={classes.form} noValidate onSubmit={handleSkillEntry}>
          <Grid container spacing={2} style={{ marginTop: '0.5rem' }}>
            <Grid item xs={9}>
              <TextField
                id='skill-entry' name='skill-entry'
                variant='outlined' label='Skill'
                fullWidth autoFocus
                value={skillEntry}
                onChange={e => setSkillEntry(e.target.value)}
              />
            </Grid>

            <Grid item xs={3}>
              <Button 
                type='submit' variant='contained' 
                color='primary'
                className={classes.addButton}>
                +
              </Button>
            </Grid>

            <Grid
              container spacing={1} 
              style={{ minHeight: '10rem', margin: '2rem .5rem' }}
              justify={skills.length ? 'flex-start' : 'center'}
              alignItems={skills.length ? 'flex-start' : 'center'}
              >
              {skills.length ? null : <p style={{ color: 'grey' }}>No skills entered</p>}
              {skills.map(s => <Grid item key={s}><Chip label={s} onDelete={handleDelete(s)} color='primary' /></Grid>)}
            </Grid>
          </Grid>
        </form>

        <Button fullWidth variant='contained' color='primary' className={classes.submit} onClick={updateSkills}>
          NEXT
        </Button>
      </Paper>
    </Container>
  );
}

SkillsSignup.getInitialProps = async (ctx) => {
  const { authenticated } = await checkAuth(ctx);
  if (!authenticated) redirectPage(ctx, '/login');
  return { authenticated };
}

export default SkillsSignup;
