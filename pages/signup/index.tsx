import React, { useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import Router from 'next/router';
import { Avatar, Button, TextField, Typography } from '@material-ui/core';
import { Grid, Container, Paper } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import fetch from 'isomorphic-unfetch';

import CopyrightFooter from 'components/CopyrightFooter';
import useStyles from 'public/static/styles/auth';
import { BE_ADDR, checkAuth, redirectPage } from 'utils';

const SignupPage: NextPage = () => {
  const classes = useStyles();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [success, setSuccess] = useState(true);
  const userType = 'Student';

  const handleSignup = async (event): Promise<void> => {
    event.preventDefault();

    try {
      const signupRes = await fetch(`${BE_ADDR}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password, userType }),
      });

      if (!signupRes.ok) throw new Error('Failed to create user');

      const studentRes = await fetch(`${BE_ADDR}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ firstName, lastName, email: username }),
      });

      if (!studentRes.ok) throw new Error('Failed to create student profile');

      setSuccess(true);
      Router.push('/signup/profile');
    } catch (err) {
      setSuccess(false);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs" className={classes.outer}>
        <Paper elevation={2} className={classes.paper}>
          <Avatar className={classes.avatar}>
            <p>N</p>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>

          <form className={classes.form} style={{ marginTop: '1.5rem' }} onSubmit={handleSignup}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  label="First Name"
                  id="first-name"
                  name="first-name"
                  autoComplete="given-name"
                  required
                  fullWidth
                  autoFocus
                  onChange={(e): void => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  label="Last Name"
                  id="last-name"
                  name="last-name"
                  autoComplete="family-name"
                  required
                  fullWidth
                  onChange={(e): void => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="Email Address"
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  fullWidth
                  onChange={(e): void => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  label="Password"
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="curent-password"
                  required
                  fullWidth
                  onChange={(e): void => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>

            {!success ? (
              <Alert className={classes.alert} severity="error">
                Someone's already using that email.
              </Alert>
            ) : null}

            <Button
              type="submit"
              aria-label="Sign Up"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
          </form>
        </Paper>

        <Paper elevation={2} className={classes.paper}>
          <Typography variant="body2" align="center">
            {`Have an account? `}
            <Link href="/login">
              <a className={classes.link}>Log In</a>
            </Link>
          </Typography>
        </Paper>
      </Container>

      <CopyrightFooter />
    </>
  );
};

SignupPage.getInitialProps = async (ctx): Promise<{ authenticated: boolean }> => {
  const { authenticated } = await checkAuth(ctx);
  if (authenticated) redirectPage(ctx, '/');
  return { authenticated };
};

export default SignupPage;
