import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import fetch from 'isomorphic-unfetch';
import { Alert } from '@material-ui/lab';

function Copyright() {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        height: '6rem',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
      }}
    >
      <Typography
        variant='body2'
        color='textSecondary'
        align='center'
        style={{ fontWeight: 'bold' }}
      >
        {'Copyright © '}
        <Link color='inherit' href='https://www.facebook.com/uw.nexus'>
          NEXUS
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  outer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },

  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5rem',
    padding: '2rem'
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.light
  },

  form: {
    width: '100%',
    marginTop: theme.spacing(1)
  },

  submit: {
    margin: theme.spacing(3, 0, 2)
  }, 

  alert: {
    marginTop: '1rem'
  }
}));

export default () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [accepted, setAccepted] = useState(true);

  const handleLogin = async (event) => {
    event.preventDefault();

    const res = await fetch('http://127.0.0.1:3100/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ username, password })
    });

    if (res.ok) {
      setAccepted(true);
      const { token } = await res.json();
      console.log(token);
    } else {
      setAccepted(false);
    }
  }

  return (
    <Container component='main' maxWidth='xs' className={classes.outer}>
      <div>
        <Paper elevation={2} className={classes.paper}>
          <Avatar className={classes.avatar}>
            <p>N</p>
          </Avatar>

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
        </Paper>

        <Paper elevation={2} className={classes.paper}>
          <Typography variant='body2' align='center'>
            {`Don't have an account? `}
            <Link href='#' style={{ fontWeight: 'bold' }}>
              {'Sign Up'}
            </Link>
          </Typography>
        </Paper>
      </div>
      <Copyright />
    </Container>
  );
}
