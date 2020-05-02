import React, { useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { Button, TextField, Typography, InputAdornment, IconButton } from '@material-ui/core';
import { Box, Container } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import fetch from 'isomorphic-unfetch';

import { BE_ADDR, checkAuth, redirectPage } from 'utils';

const useStyles = makeStyles((theme) => ({
  outer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 'calc(100% - 6rem)',
    marginTop: '2rem',
    marginBottom: 0,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  button: {
    border: '2px solid #F05A28',
    borderRadius: '10px',
    width: '100%',
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    fontSize: theme.spacing(2.5),
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
  },
  heading: {
    fontSize: theme.spacing(3),
  },
  title: {
    paddingLeft: '.5rem',
    fontWeight: 'bold',
  },
  text: {
    fontSize: theme.spacing(2.25),
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
  skip: {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: '#BBBBBB',
    fontSize: theme.spacing(2.5),
  },
}));

const SuccessPage: NextPage<{ firstName: string }> = ({ firstName }) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" className={classes.outer}>
      <Box marginTop="6rem">
        <Typography component="h1" align="center" className={classes.heading}>
          Welcome <span style={{ fontWeight: 'bold' }}>{firstName},</span>
        </Typography>
      </Box>

      <Box marginBottom="14rem">
        <Typography align="center" className={classes.text}>
          For your better experience with searching projects and team members,
        </Typography>
        <Typography align="center" style={{ marginTop: '.5rem' }}>
          <Link href="/signup/edu">
            <a className={`${classes.link} ${classes.text}`}>please set your preferences.</a>
          </Link>
        </Typography>
      </Box>

      <Box width="60%">
        <Link href="/signup/edu">
          <Button className={classes.button} aria-label="Join" size="large">
            Set Up Profile
          </Button>
        </Link>
      </Box>

      <Box textAlign="right" width="100%" paddingRight="1rem">
        <Link href="/">
          <a className={classes.skip}>Skip</a>
        </Link>
      </Box>
    </Container>
  );
};

const SignupPage: NextPage = () => {
  const classes = useStyles();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [success, setSuccess] = useState(null);

  const handleSignup = async (event): Promise<void> => {
    event.preventDefault();

    try {
      const userType = 'Student';
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
    } catch (err) {
      setSuccess(false);
    }
  };

  if (success !== null && success) return <SuccessPage firstName={firstName} />;

  return (
    <Container component="main" maxWidth="xs" className={classes.outer} style={{ justifyContent: 'center' }}>
      <form className={classes.form} onSubmit={handleSignup}>
        <Typography className={classes.title}>Sign Up</Typography>

        <TextField
          variant="outlined"
          margin="normal"
          label="First Name"
          id="first-name"
          name="first-name"
          autoComplete="given-name"
          required
          fullWidth
          autoFocus
          onChange={(e): void => setFirstName(e.target.value)}
        />

        <TextField
          variant="outlined"
          margin="normal"
          label="Last Name"
          id="last-name"
          name="last-name"
          autoComplete="family-name"
          required
          fullWidth
          onChange={(e): void => setLastName(e.target.value)}
        />

        <TextField
          variant="outlined"
          margin="normal"
          label="Email Address"
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          fullWidth
          onChange={(e): void => setUsername(e.target.value)}
        />

        <TextField
          variant="outlined"
          margin="normal"
          name="password"
          id="password"
          label="Password"
          autoComplete="curent-password"
          required
          fullWidth
          type={showPassword ? 'text' : 'password'}
          onChange={(e): void => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={(): void => setShowPassword(!showPassword)}
                  onMouseDown={(e): void => e.preventDefault()}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {success !== null && !success ? (
          <Box marginTop="1rem">
            <Alert severity="error">Someone's already using that email.</Alert>
          </Box>
        ) : null}

        <Box marginX="20%" marginY="3rem">
          <Button type="submit" aria-label="Sign Up" size="large" className={classes.button}>
            Sign Up
          </Button>
        </Box>
      </form>
    </Container>
  );
};

SignupPage.getInitialProps = async (ctx): Promise<{ authenticated: boolean }> => {
  const { authenticated } = await checkAuth(ctx);
  if (authenticated) redirectPage(ctx, '/');
  return { authenticated };
};

export default SignupPage;
