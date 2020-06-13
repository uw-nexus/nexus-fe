import React, { useState } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { TextField, Typography, IconButton } from '@material-ui/core';
import { Container, Box, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import fetch from 'isomorphic-unfetch';
import MainButton from 'components/MainButton';
import { FONT } from 'public/static/styles/constants';
import { BE_ADDR } from 'utils';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: '100%',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(20),
  },
  heading: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  title: {
    fontSize: FONT.HEADING,
    color: theme.palette.text.primary,
  },
  text: {
    fontSize: FONT.GUIDE,
    color: theme.palette.text.secondary,
  },
}));

const Result: NextPage<{ res: boolean }> = ({ res }) => {
  if (res == null) return null;

  return res ? (
    <Alert variant="filled" severity="success">
      {`If your email matches an existing account we will 
        send a password reset email soon. 
        If you have not received an email check your 
        spam folder.`}
    </Alert>
  ) : (
    <Alert variant="filled" severity="error">
      Error encountered.
    </Alert>
  );
};

const ForgotPasswordPage: NextPage = () => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [res, setRes] = useState(null);

  const resetPassword = async (event): Promise<void> => {
    event.preventDefault();
    const res = await fetch(`${BE_ADDR}/auth/password-reset?email=${email}`);
    setRes(res.ok);
  };

  return (
    <>
      <Container maxWidth="xs" disableGutters>
        <Grid container className={classes.heading}>
          <Grid item xs={2}>
            <IconButton style={{ padding: 0, marginLeft: '-10px' }} onClick={(): void => Router.back()}>
              <img src="/static/assets/back.svg" alt="back" />
            </IconButton>
          </Grid>
          <Grid item xs={8}>
            <Box display="flex" justifyContent="space-evenly" alignItems="center" height="100%">
              <Typography align="center" className={classes.title}>
                {`Reset Password`}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <form onSubmit={resetPassword} style={{ height: '100%' }}>
        <Container component="main" maxWidth="xs" className={classes.content}>
          <Box>
            <Box marginY="2rem">
              <Typography className={classes.text}>
                {`No worries! We will send you an email to help you reset your password. Please type your email address that you used when you reigstered.`}
              </Typography>
            </Box>
            <Box marginY="1rem">
              <Result res={res} />
            </Box>
            <TextField
              variant="outlined"
              margin="normal"
              label="Email Address"
              name="email"
              type="email"
              id="email"
              required
              fullWidth
              autoFocus
              value={email}
              onChange={(e): void => setEmail(e.target.value)}
            />
          </Box>
          <Box display="flex" alignItems="center" justifyContent="center" paddingX="20%">
            <MainButton type="submit" label="Reset Password" />
          </Box>
        </Container>
      </form>
    </>
  );
};

export default ForgotPasswordPage;
