import React from 'react';
import Router from 'next/router';
import { Avatar, Typography, IconButton } from '@material-ui/core';
import { Container, Paper, Grid } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

import SkillsForm from '../components/profile/SkillsForm';
import useStyles from '../static/profile/style';
import { callApi, checkAuth, redirectPage } from '../utils';

const ProfilePage = ({ student }) => {
  const classes = useStyles();

  const { firstName, lastName } = student.profile;

  return (
    <Container component='main' maxWidth='xs' className={`${classes.outer} ${classes.profileOuter}`}>
      <Grid container>
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

      <Grid container spacing={3}
        alignItems='center'
        className={classes.profileMain}
        >
        <Grid item xs={12} container justify='center'>
          <Avatar alt='Profile Picture' className={classes.profilePic} />
        </Grid>
        <Grid item xs={12} container justify='center'>
          <Typography component='h1' variant='h5'>{`${firstName} ${lastName}`}</Typography>
        </Grid>
      </Grid>

      <Paper elevation={8} className={`${classes.paper} ${classes.profilePaper}`}>
        <SkillsForm student={student} />
      </Paper>
    </Container>
  );
}

ProfilePage.getInitialProps = async (ctx) => {
  const { authenticated } = await checkAuth(ctx);
  if (!authenticated) redirectPage(ctx, '/login');

  const student = await callApi(ctx, 'http://localhost:3000/api/student');
  return { student };
}

export default ProfilePage;
