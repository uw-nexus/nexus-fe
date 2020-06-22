import React, { useState } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { Button, Typography, Link } from '@material-ui/core';
import { Container, Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import fetch from 'isomorphic-unfetch';

import UserCredentialsInput from 'components/UserCredentialsInput';
import MainButton from 'components/MainButton';
import { COLORS, FONT } from 'public/static/styles/constants';
import { BE_ADDR, checkAuth, redirectPage, vh } from 'utils';

const useStyles = makeStyles((theme) => ({
  outer: {
    minHeight: vh(95),
    marginTop: vh(5),
    marginBottom: 0,
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  inner: {
    minHeight: vh(75),
    paddingBottom: vh(7),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    paddingLeft: theme.spacing(1),
    fontWeight: 'bold',
    color: theme.palette.text.primary,
  },
  oauthContainer: {
    width: '100%',
    minHeight: vh(15),
    display: 'flex',
    alignItems: 'center',
  },
  oauth: {
    width: '100%',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  fb: {
    border: `1px solid ${COLORS.GRAY_C4}`,
    borderRadius: '5px',
    width: '100%',
    fontSize: FONT.LABEL,
    color: theme.palette.text.secondary,
    background: 'linear-gradient(90deg, #3B5998 4.5%, transparent 4.5%)',
    '&:hover': {
      background: '#3B5998',
      color: 'white',
    },
  },
  link: {
    fontWeight: 'bold',
    textDecoration: 'none',
    color: theme.palette.primary.main,
    '&:hover': {
      textDecoration: 'none',
    },
  },
  footer: {
    color: COLORS.GRAY_BB,
    fontSize: FONT.MISC,
  },
}));

const LoginPage: NextPage = () => {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accepted, setAccepted] = useState(true);

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
          <Typography style={{ color: COLORS.GRAY_BB }}>Or</Typography>
        </Box>

        <form noValidate onSubmit={handleLogin}>
          <Typography className={classes.title}>Sign In</Typography>

          <UserCredentialsInput setUsername={setUsername} setPassword={setPassword} />

          <Box marginTop=".5rem" marginBottom={vh(8)} textAlign="right">
            <Link href="/password-reset" className={classes.link}>
              <Typography style={{ fontWeight: 'bold', color: COLORS.GRAY_BB }}>Forgot password?</Typography>
            </Link>
          </Box>

          {!accepted ? (
            <Box marginBottom="1rem">
              <Alert severity="error">Incorrect username or password.</Alert>
            </Box>
          ) : null}

          <Box paddingX="20%">
            <MainButton type="submit" label="Log In" />
          </Box>
        </form>
      </Box>

      <Box height={vh(10)} display="flex" alignItems="center" justifyContent="center">
        <Typography>
          {`Don't have an account? `}
          <Link href="/signup" className={classes.link}>
            Sign Up
          </Link>
        </Typography>
      </Box>

      <Box height={vh(10)} display="flex" alignItems="center" justifyContent="center">
        <Typography className={classes.footer}>
          {`By creating your account on Nexus Builders, you agree to our `}
          <span style={{ fontWeight: 'bold' }}>{`user agreement`}</span>
          {` and `}
          <span style={{ fontWeight: 'bold' }}>{`privacy policy.`}</span>
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
