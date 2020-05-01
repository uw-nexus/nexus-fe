import React, { useState } from 'react';
import { NextPage } from 'next';
import { Button, TextField, Typography } from '@material-ui/core';
import { Container, Paper, Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import fetch from 'isomorphic-unfetch';

import useStyles from 'public/static/styles/post';
import { BE_ADDR } from 'utils';

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
    <Container component="main" maxWidth="xs" className={classes.outer}>
      <Paper elevation={2} className={classes.paper}>
        <Typography component="h1" variant="h5">
          Forgot Password
        </Typography>

        <form onSubmit={resetPassword}>
          <Box marginTop="1rem">
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

          <Button
            type="submit"
            fullWidth
            aria-label="Reset Password"
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!email}
          >
            Reset Password
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default ForgotPasswordPage;
