import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Button, TextField, Typography, InputAdornment, IconButton } from '@material-ui/core';
import { Container, Box } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import fetch from 'isomorphic-unfetch';

import { BE_ADDR, checkAuth, redirectPage } from 'utils';
import { NextPage } from 'next';

const useStyles = makeStyles((theme) => ({
  outer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 'calc(100% - 6rem)',
    marginTop: '2rem',
    paddingTop: '5rem',
    marginBottom: 0,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  fbLogin: {
    border: `1px solid #C4C4C4`,
    borderRadius: '5px',
    width: '100%',
    color: theme.palette.text.secondary,
    background: 'linear-gradient(90deg, #3B5998 4.5%, #FFFFFF 4.5%)',
    '&:hover': {
      backgroundColor: '#3B5998',
      color: 'white',
    },
  },
  loginButton: {
    border: '2px solid #F05A28',
    borderRadius: '10px',
    width: '100%',
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
  },
  link: {
    fontWeight: 'bold',
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
}));

const LoginPage: NextPage = () => {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accepted, setAccepted] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (event): Promise<void> => {
    event.preventDefault();

    const res = await fetch(`${BE_ADDR}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password }),
    });

    setAccepted(res.ok);
    if (res.ok) Router.push('/');
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.outer}>
      <Link href={`${BE_ADDR}/auth/student/facebook`} prefetch={false}>
        <Button aria-label="Facebook login" className={classes.fbLogin}>
          Continue with Facebook
        </Button>
      </Link>

      <Typography style={{ color: '#BBBBBB' }}>Or</Typography>

      <form className={classes.form} noValidate onSubmit={handleLogin}>
        <Typography variant="body1" style={{ fontWeight: 'bold' }}>
          Sign In
        </Typography>

        <TextField
          variant="outlined"
          margin="normal"
          id="email"
          name="email"
          label="Email Address"
          autoComplete="email"
          required
          fullWidth
          autoFocus
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

        <Box marginY=".5rem" textAlign="right">
          <Link href="/password-reset">
            <a className={classes.link}>
              <Typography style={{ fontWeight: 'bold', color: '#BBBBBB' }}>Forgot password?</Typography>
            </a>
          </Link>
        </Box>

        {!accepted ? (
          <Box marginTop="1rem">
            <Alert severity="error">Incorrect username or password.</Alert>
          </Box>
        ) : null}

        <Box marginX="20%" marginY="3rem">
          <Button type="submit" aria-label="Log In" size="large" className={classes.loginButton}>
            Log In
          </Button>
        </Box>
      </form>

      <Typography variant="body1">
        {`Don't have an account? `}
        <Link href="/signup">
          <a className={classes.link}>Sign Up</a>
        </Link>
      </Typography>
    </Container>
  );
};

LoginPage.getInitialProps = async (ctx): Promise<{ authenticated: boolean }> => {
  const { authenticated } = await checkAuth(ctx);
  if (authenticated) redirectPage(ctx, '/');
  return { authenticated };
};

export default LoginPage;
