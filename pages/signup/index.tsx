import React, { useState } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { TextField, Typography } from '@material-ui/core';
import { Box, Container } from '@material-ui/core';
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
    minHeight: vh(85),
    paddingBottom: vh(7),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontSize: FONT.HEADING,
    color: theme.palette.text.primary,
  },
  title: {
    paddingLeft: theme.spacing(1),
    fontWeight: 'bold',
    color: theme.palette.text.primary,
  },
  text: {
    fontSize: FONT.GUIDE,
    color: theme.palette.text.primary,
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
  skip: {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: COLORS.GRAY_BB,
    fontSize: FONT.ACTION_BTN,
  },
}));

const SuccessPage: NextPage<{ firstName: string }> = ({ firstName }) => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs" className={classes.outer}>
      <Box className={classes.inner}>
        <Box marginTop={vh(10)}>
          <Typography align="center" className={classes.heading}>
            Welcome <span style={{ fontWeight: 'bold' }}>{firstName}</span>,
          </Typography>
        </Box>
        <Box marginBottom={vh(25)}>
          <Typography align="center" className={classes.text}>
            For your better experience with searching projects and team members,
          </Typography>
          <Typography align="center" style={{ marginTop: '.5rem' }}>
            <Link href="/signup/setup">
              <a className={`${classes.link} ${classes.text}`}>please set your preferences.</a>
            </Link>
          </Typography>
        </Box>
        <Box width="60%">
          <MainButton href="/signup/setup" label="Set Up Profile" />
        </Box>
      </Box>

      <Box
        width="100%"
        height={vh(10)}
        paddingRight=".75rem"
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
      >
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
      <form onSubmit={handleSignup}>
        <Box className={classes.inner} justifyContent="flex-end !important">
          <Box marginBottom={vh(10)}>
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

            <UserCredentialsInput setUsername={setUsername} setPassword={setPassword} />

            {success !== null && !success ? (
              <Box marginTop="1rem">
                <Alert severity="error">Someone's already using that email.</Alert>
              </Box>
            ) : null}
          </Box>

          <Box width="100%" paddingX="20%">
            <MainButton type="submit" label="Sign Up" />
          </Box>
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
