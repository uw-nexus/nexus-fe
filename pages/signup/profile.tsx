import React, { useState, useRef, useEffect } from 'react';
import Router from 'next/router';
import { Button, TextField, Typography, FormControl, InputLabel, Select } from '@material-ui/core';
import { Container, Paper } from '@material-ui/core';
import fetch from 'isomorphic-unfetch';

import useStyles from '../../static/auth/style';
import { checkAuth, redirectPage } from '../../utils';

const standingChoices = [
  'Freshman',
  'Sophomore',
  'Junior',
  'Senior',
  'Graduate'
];

// TODO: see getInitialProps
const schoolChoices = [
  'University of Washington'
];

const ProfileSignup = () => {
  const classes = useStyles();

  const [profile, setProfile] = useState({
    dob: '',
    school: '',
    standing: '',
  });

  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = (name) => (event) => {
    setProfile({
      ...profile,
      [name]: event.target.value
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      profile.dob = new Date(profile.dob).toISOString().split('T')[0];
    } catch {
      profile.dob = '';
    }

    await fetch('http://localhost:3100/students', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ student: { profile } })
    });

    Router.push('/signup/skills');
  }

  return (
    <Container component='main' maxWidth='xs' className={classes.outer}>
      <Paper elevation={2} className={classes.paper}>
        <Typography component='h1' variant='h5'>
          Complete your profile!
        </Typography>

        <form className={classes.form} noValidate onSubmit={handleLogin}>
          <TextField
            variant='outlined' margin='normal'
            id='dob' name='dob'
            label='Date of Birth (MM/DD/YYYY)'
            autoComplete='dob'
            fullWidth autoFocus
            onChange={handleChange('dob')}
          />

          <FormControl variant='outlined' margin='normal' fullWidth>
            <InputLabel ref={inputLabel} htmlFor='school'>School</InputLabel>
            <Select
              native value={profile.school}
              labelWidth={labelWidth}
              inputProps={{ name: 'school', id: 'school' }}
              onChange={handleChange('school')}
            >
              <option value='' />
              {schoolChoices.map(s => <option key={s} value={s}>{s}</option>)}
            </Select>
          </FormControl>

          <FormControl variant='outlined' margin='normal' fullWidth>
            <InputLabel ref={inputLabel} htmlFor='standing'>Standing</InputLabel>
            <Select
              native value={profile.standing}
              labelWidth={labelWidth}
              inputProps={{ name: 'standing', id: 'standing' }}
              onChange={handleChange('standing')}
            >
              <option value='' />
              {standingChoices.map(s => <option key={s} value={s}>{s}</option>)}
            </Select>
          </FormControl>

          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            NEXT
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

ProfileSignup.getInitialProps = async (ctx) => {
  const { authenticated } = await checkAuth(ctx);
  if (!authenticated) redirectPage(ctx, '/login');
  // TODO: fetch available schools from backend and return as props
  return { authenticated };
}

export default ProfileSignup;
