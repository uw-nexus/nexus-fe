import React, { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Avatar, Button, TextField, Typography } from '@material-ui/core';
import { Container, Paper } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import fetch from 'isomorphic-unfetch';

import CopyrightFooter from '../components/CopyrightFooter';
import useStyles from '../static/auth/style';
import { checkAuth, redirectPage } from '../utils';

const LoginPage = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accepted, setAccepted] = useState(true);

  const handleLogin = async (event) => {
    event.preventDefault();

    const res = await fetch('http://localhost:3100/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username, password })
    });

    setAccepted(res.ok);
    if (res.ok) Router.push('/');
  }

  return (
    <React.Fragment>
      <Container component='main' maxWidth='xs' className={classes.outer}>
        <Paper elevation={2} className={classes.paper}>
          <Avatar className={classes.avatar}>
            <p>N</p>
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign In
          </Typography>

          <form className={classes.form} noValidate onSubmit={handleLogin}>
            <TextField
              variant='outlined' margin='normal'
              id='email' name='email'
              label='Email Address'
              autoComplete='email'
              required fullWidth autoFocus
              onChange={e => setUsername(e.target.value)}
            />
            <TextField
              variant='outlined' margin='normal'
              name='password' type='password' id='password'
              label='Password'
              autoComplete='curent-password'
              required fullWidth
              onChange={e => setPassword(e.target.value)}
            />

            {/* <Link href='#' variant='body2'>
              Forgot password?
            </Link> */}
            { !accepted ? <Alert className={classes.alert} severity='error'>Incorrect username or password.</Alert> : null}

            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
              Log In
            </Button>
          </form>

          <Link href='http://localhost:3100/auth/student/facebook' prefetch={false}>
            <a className={classes.link}>Continue with Facebook</a>
          </Link>
        </Paper>

        <Paper elevation={2} className={classes.paper}>
          <Typography variant='body2' align='center'>
            {`Don't have an account? `}
            <Link href='/auth/signup'>
              <a className={classes.link}>Sign Up</a>
            </Link>
          </Typography>
        </Paper>
      </Container>

      <CopyrightFooter />
    </React.Fragment>
  );
}

LoginPage.getInitialProps = async (ctx) => {
  const { authenticated } = await checkAuth(ctx);
  if (authenticated) redirectPage(ctx, '/');
  return { authenticated };
}

export default LoginPage;
