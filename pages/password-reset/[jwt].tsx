import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, TextField, Typography } from '@material-ui/core';
import { Container, Paper, Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import fetch from 'isomorphic-unfetch';

import useStyles from 'public/static/styles/post';
import { BE_ADDR, checkAuth, redirectPage } from 'utils';

const Result: NextPage<{ res: boolean }> = ({ res }) => {
  if (res == null) return null;

  return res ? (
    <Alert variant="filled" severity="success">
      Password has been reset!
    </Alert>
  ) : (
    <Alert variant="filled" severity="error">
      Failed to reset password.
    </Alert>
  );
};

const PasswordResetPage: NextPage = () => {
  const classes = useStyles();

  const router = useRouter();
  const { jwt } = router.query;

  const [password, setPassword] = useState('');
  const [confPass, setConfPass] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [res, setRes] = useState(null);

  useEffect(() => setDisabled(!password || password !== confPass), [password, confPass]);

  const resetPassword = async (event): Promise<void> => {
    event.preventDefault();
    const res = await fetch(`${BE_ADDR}/auth/password-reset`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

    setRes(res.ok);
  };

  if (res)
    return (
      <Container component="main" maxWidth="md" className={classes.outer}>
        <Paper elevation={2} className={classes.paper}>
          <Typography component="h1" variant="h5">
            Enter a new password
          </Typography>
          <Box marginTop="1rem" width="100%">
            <Result res={res} />
          </Box>
          <Box marginTop="1rem" width="100%">
            <Link href="/">
              <Button fullWidth aria-label="Home" variant="contained" color="primary">
                Log In
              </Button>
            </Link>
          </Box>
        </Paper>
      </Container>
    );

  return (
    <Container component="main" maxWidth="md" className={classes.outer}>
      <Paper elevation={2} className={classes.paper}>
        <Typography component="h1" variant="h5">
          Enter a new password
        </Typography>

        <form onSubmit={resetPassword}>
          <Box marginTop="1rem">
            <Result res={res} />
          </Box>

          <TextField
            variant="outlined"
            margin="normal"
            label="Password"
            name="password"
            type="password"
            id="password"
            required
            fullWidth
            autoFocus
            value={password}
            onChange={(e): void => setPassword(e.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            label="Confirm Password"
            name="conf-password"
            type="password"
            id="conf-password"
            required
            fullWidth
            value={confPass}
            onChange={(e): void => setConfPass(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            aria-label="Change Password"
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={disabled}
          >
            Change Password
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

PasswordResetPage.getInitialProps = async (ctx): Promise<{ authenticated: boolean }> => {
  const { authenticated } = await checkAuth(ctx);
  if (authenticated) redirectPage(ctx, '/');
  return { authenticated };
};

export default PasswordResetPage;
