import React from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { Avatar, Typography, IconButton } from '@material-ui/core';
import { Container, Grid } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

import withNavbar from 'components/Navbar';
import ProfileTabs from 'components/profile/ProfileTabs';
import useStyles from 'public/static/styles/profile';
import { FE_ADDR, callApi, redirectPage } from 'utils';
import { Student } from 'types/index';

type PageProps = {
  student: Student;
};

const ProfilePage: NextPage<PageProps> = ({ student }) => {
  const classes = useStyles();
  const { firstName, lastName } = student.profile;

  return (
    <Container component="main" maxWidth="xs" className={classes.profileOuter}>
      <Grid container className={classes.profileHeader}>
        <Grid item container xs={3} justify="center">
          <IconButton aria-label="Back" onClick={(): void => Router.back()}>
            <ArrowBack fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item container xs={6} alignItems="center" justify="center">
          <Typography component="h1" variant="h4">
            Profile
          </Typography>
        </Grid>
      </Grid>

      <Grid container alignItems="center" className={classes.profileMain}>
        <Grid item xs={12} container justify="center" style={{ margin: '.5rem' }}>
          <Avatar className={classes.profilePic} alt="Profile Picture" src={student.profile.photoUrl} />
        </Grid>
        <Grid item xs={12} container justify="center" style={{ margin: '.5rem' }}>
          <Typography component="h1" variant="h5">{`${firstName} ${lastName}`}</Typography>
        </Grid>
      </Grid>

      <ProfileTabs student={student} />
    </Container>
  );
};

ProfilePage.getInitialProps = async (ctx): Promise<PageProps> => {
  try {
    const student = await callApi(ctx, `${FE_ADDR}/api/profile`);
    return { student };
  } catch (error) {
    redirectPage(ctx, '/login');
  }
};

export default withNavbar(ProfilePage);
