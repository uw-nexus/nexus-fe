import React, { useState } from 'react';
import Router from 'next/router';
import { Button, TextField, Typography, InputAdornment, IconButton, Link } from '@material-ui/core';
import { Container, Box } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import fetch from 'isomorphic-unfetch';

import { BE_ADDR, checkAuth, redirectPage } from 'utils';
import { NextPage } from 'next';

const useStyles = makeStyles((theme) => ({
  outer: {
    minHeight: '95vh',
    marginTop: '5vh',
    marginBottom: 0,
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  inner: {
    minHeight: '85vh',
    paddingBottom: '7vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    paddingLeft: theme.spacing(1),
    fontWeight: 'bold',
  },
  oauthContainer: {
    width: '100%',
    minHeight: '15vh',
    display: 'flex',
    alignItems: 'center',
  },
  oauth: {
    width: '100%',
    textDecoration: 'none',
  },
  fb: {
    border: `1px solid #C4C4C4`,
    borderRadius: '5px',
    width: '100%',
    color: theme.palette.text.secondary,
    fontSize: theme.spacing(4),
    background: 'linear-gradient(90deg, #3B5998 4.5%, #FFFFFF 4.5%)',
    '&:hover': {
      background: '#3B5998',
      color: 'white',
    },
  },
  loginButton: {
    border: '2px solid #F05A28',
    borderRadius: '10px',
    width: '100%',
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    fontSize: theme.spacing(5),
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
      <Box className={classes.inner}>
        <Box className={classes.oauthContainer}>
          <Link href={`${BE_ADDR}/auth/student/facebook`} className={classes.oauth}>
            <Button aria-label="Facebook login" className={classes.fb}>
              Continue with Facebook
            </Button>
          </Link>
        </Box>

        <Box textAlign="center">
          <Typography style={{ color: '#BBBBBB' }}>Or</Typography>
        </Box>

        <form noValidate onSubmit={handleLogin}>
          <Typography className={classes.title}>Sign In</Typography>

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
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box marginTop=".5rem" marginBottom="8vh" textAlign="right">
            <Link href="/password-reset" className={classes.link}>
              <Typography style={{ fontWeight: 'bold', color: '#BBBBBB' }}>Forgot password?</Typography>
            </Link>
          </Box>

          {!accepted ? (
            <Box marginTop="1rem">
              <Alert severity="error">Incorrect username or password.</Alert>
            </Box>
          ) : null}

          <Box paddingX="20%">
            <Button type="submit" aria-label="Log In" size="large" className={classes.loginButton}>
              Log In
            </Button>
          </Box>
        </form>
      </Box>

      <Box height="10vh" display="flex" alignItems="center" justifyContent="center">
        <Typography>
          {`Don't have an account? `}
          <Link href="/signup" className={classes.link}>
            Sign Up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

LoginPage.getInitialProps = async (ctx): Promise<{ authenticated: boolean }> => {
  const { authenticated } = await checkAuth(ctx);
  if (authenticated) redirectPage(ctx, '/');
  return { authenticated };
};

export default LoginPage;
