import React from 'react';
import Router from 'next/router';
import { Avatar, Typography } from '@material-ui/core';
import { Container, Paper } from '@material-ui/core';
import cookies from 'next-cookies';

import CopyrightFooter from '../components/CopyrightFooter';
import useStyles from '../static/auth/style';

const Home = ({ jwt }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Container component='main' maxWidth='xs' className={classes.outer}>
        <Paper elevation={2} className={classes.paper}>
          <Avatar className={classes.avatar}>
            <p>N</p>
          </Avatar>
          <Typography component='h1' variant='h5'>
            Home
          </Typography>
          <Typography component='h1' variant='h5'>
            {jwt ? 'Logged In' : 'Not logged in'}
          </Typography>
        </Paper>
      </Container>
      <CopyrightFooter />
    </React.Fragment>
  );
}

Home.getInitialProps = async (ctx) => {
  const { jwt } = cookies(ctx);

  if (!jwt) {
    if (typeof window !== 'undefined') {
      Router.push('/auth/login');
    } else {
      ctx.res.writeHead(302, { Location: '/auth/login' })
      ctx.res.end();
    }
  }
  
  return { jwt };
}

export default Home;
