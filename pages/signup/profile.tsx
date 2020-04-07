import React, { useState, useRef, useEffect } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { Button, TextField, Typography, FormControl, InputLabel, Select } from '@material-ui/core';
import { Container, Paper } from '@material-ui/core';
import fetch from 'isomorphic-unfetch';

import useStyles from 'public/static/styles/auth';
import { BE_ADDR, checkAuth, redirectPage, formatDateBE } from 'utils';

const standingChoices = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'];

// TODO: see getInitialProps
const schoolChoices = ['University of Washington'];

const majorChoices = [
  'Informatics',
  'Computer Science',
  'Human Centered Design & Engineering',
  'Business Administration',
];

const ProfileSignup: NextPage = () => {
  const classes = useStyles();

  const [profile, setProfile] = useState({
    dob: '',
    school: '',
    standing: '',
    major1: '',
    major2: '',
  });

  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = (name) => (event): void => {
    setProfile({
      ...profile,
      [name]: event.target.value,
    });
  };

  const handleProfileUpdate = async (event): Promise<void> => {
    event.preventDefault();

    try {
      profile.dob = formatDateBE(profile.dob);
    } catch {
      profile.dob = '';
    }

    await fetch(`${BE_ADDR}/students`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ profile }),
    });

    Router.push('/signup/skills');
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.outer}>
      <Paper elevation={2} className={classes.paper}>
        <Typography component="h1" variant="h5">
          Complete your profile!
        </Typography>

        <form className={classes.form} noValidate onSubmit={handleProfileUpdate}>
          <TextField
            variant="outlined"
            margin="normal"
            id="dob"
            name="dob"
            label="Date of Birth (MM/DD/YYYY)"
            fullWidth
            autoFocus
            onChange={handleChange('dob')}
          />

          <FormControl variant="outlined" margin="normal" fullWidth>
            <InputLabel ref={inputLabel} htmlFor="school">
              School
            </InputLabel>
            <Select
              native
              value={profile.school}
              labelWidth={labelWidth}
              inputProps={{ name: 'school', id: 'school' }}
              onChange={handleChange('school')}
            >
              <option value="" />
              {schoolChoices.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" margin="normal" fullWidth>
            <InputLabel ref={inputLabel} htmlFor="standing">
              Standing
            </InputLabel>
            <Select
              native
              value={profile.standing}
              labelWidth={labelWidth}
              inputProps={{ name: 'standing', id: 'standing' }}
              onChange={handleChange('standing')}
            >
              <option value="" />
              {standingChoices.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" margin="normal" fullWidth>
            <InputLabel ref={inputLabel} htmlFor="major1">
              Major 1
            </InputLabel>
            <Select
              native
              value={profile.major1}
              labelWidth={labelWidth}
              inputProps={{ name: 'major1', id: 'major1' }}
              onChange={handleChange('major1')}
            >
              <option value="" />
              {majorChoices.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" margin="normal" fullWidth>
            <InputLabel ref={inputLabel} htmlFor="major2">
              Major 2
            </InputLabel>
            <Select
              native
              value={profile.major2}
              labelWidth={labelWidth}
              inputProps={{ name: 'major2', id: 'major2' }}
              onChange={handleChange('major2')}
            >
              <option value="" />
              {majorChoices.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          </FormControl>

          <Button
            type="submit"
            aria-label="Next"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            NEXT
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

ProfileSignup.getInitialProps = async (ctx): Promise<{ authenticated: boolean }> => {
  const { authenticated } = await checkAuth(ctx);
  if (!authenticated) redirectPage(ctx, '/login');
  // TODO: fetch available schools from backend and return as props
  return { authenticated };
};

export default ProfileSignup;
