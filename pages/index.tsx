import React from 'react';
import { Avatar, Typography } from '@material-ui/core';
import { Container, Paper } from '@material-ui/core';

import CopyrightFooter from '../components/CopyrightFooter';
import useStyles from '../static/auth/style';
import { checkAuth, redirectPage } from '../utils';

const Home = ({ authenticated }) => {
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
            {authenticated ? 'Logged in' : 'Not logged in'}
          </Typography>
        </Paper>
      </Container>
      <CopyrightFooter />
    </React.Fragment>
  );
}

Home.getInitialProps = async (ctx) => {
  const { authenticated } = await checkAuth(ctx);
  if (!authenticated) redirectPage(ctx, '/login');
  return { authenticated };
}

export default Home;
