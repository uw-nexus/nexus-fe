import React from 'react';
import Router from 'next/router';
import { Avatar, Typography, IconButton } from '@material-ui/core';
import { Container, Grid } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

import withNavbar from '../components/Navbar';
import ProfileTabs from '../components/profile/ProfileTabs';
import useStyles from '../static/profile/style';
import { callApi, checkAuth, redirectPage } from '../utils';

const ProfilePage = ({ student }) => {
  const classes = useStyles();
  const { firstName, lastName } = student.profile;

  return (
    <Container component='main' maxWidth='xs' className={classes.profileOuter}>
      <Grid container className={classes.profileHeader}>
        <Grid item container xs={3} justify='center'>
          <IconButton onClick={() => Router.back()}>
            <ArrowBack fontSize='large' />
          </IconButton>
        </Grid>
        <Grid item container xs={6} alignItems='center' justify='center'>
          <Typography component='h1' variant='h4'>
            Profile
          </Typography>
        </Grid>
      </Grid>

      <Grid container alignItems='center' className={classes.profileMain}>
        <Grid item xs={12} container justify='center' style={{ margin: '.5rem' }}>
          <Avatar
            className={classes.profilePic}
            alt='Profile Picture'
            src={student.profile.photoUrl}
          />
        </Grid>
        <Grid item xs={12} container justify='center' style={{ margin: '.5rem' }}>
          <Typography component='h1' variant='h5'>{`${firstName} ${lastName}`}</Typography>
        </Grid>
      </Grid>

      <ProfileTabs student={student} />
    </Container>
  );
}

ProfilePage.getInitialProps = async (ctx) => {
  const { authenticated } = await checkAuth(ctx);
  if (!authenticated) redirectPage(ctx, '/login');

  const student = await callApi(ctx, `${process.env.FE_ADDR}/api/profile`);
  return { student };
}

export default withNavbar(ProfilePage);
