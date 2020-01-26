import React, { useState } from 'react';
import Link from 'next/link';
import { Avatar, Button, TextField, Typography } from '@material-ui/core';
import { Grid, Container, Paper } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import fetch from 'isomorphic-unfetch';

import CopyrightFooter from '../../components/CopyrightFooter';
import useStyles from '../../static/auth/style';

export default () => {
  const classes = useStyles();
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [success, setSuccess] = useState(true);
  const userType = 'Student';

  const handleSignup = async event => {
    event.preventDefault();

    try {
      const signupRes = await fetch('http://127.0.0.1:3100/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password, userType })
      });

      if (!signupRes.ok) throw new Error('Failed to create user');
      
      const studentRes = await fetch('http://127.0.0.1:3100/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ firstName, lastName, email: username })
      });

      const { studentId } = await studentRes.json();
      console.log(studentId);

      setSuccess(true);
    } catch (err) {
      setSuccess(false);
    }
  };

  return (
    <React.Fragment>
      <Container component='main' maxWidth='xs' className={classes.outer}>
        <Paper elevation={2} className={classes.paper}>
          <Avatar className={classes.avatar}>
            <p>N</p>
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign Up
          </Typography>

          <form className={classes.form} style={{ marginTop: '1.5rem' }} noValidate onSubmit={handleSignup}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant='outlined' label='First Name'
                  id='first-name' name='first-name'
                  autoComplete='given-name'
                  required fullWidth autoFocus
                  onChange={e => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant='outlined' label='Last Name'
                  id='last-name' name='last-name'
                  autoComplete='family-name'
                  required fullWidth
                  onChange={e => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined' label='Email Address'
                  id='email' name='email'
                  autoComplete='email'
                  required fullWidth
                  onChange={e => setUsername(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined' label='Password'
                  name='password' type='password' id='password'
                  autoComplete='curent-password'
                  required fullWidth
                  onChange={e => setPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            
            { !success ? <Alert className={classes.alert} severity='error'>Someone's already using that email.</Alert> : null}

            <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
              Sign Up
            </Button>
          </form>
        </Paper>

        <Paper elevation={2} className={classes.paper}>
          <Typography variant='body2' align='center'>
            {`Have an account? `}
            <Link href='/auth/login'>
              <a className={classes.link}>Log In</a>
            </Link>
          </Typography>
        </Paper>
      </Container>

      <CopyrightFooter />
    </React.Fragment>
  );
}
