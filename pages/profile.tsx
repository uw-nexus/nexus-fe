import React, { useState } from 'react';
import Router from 'next/router';
import { Avatar, Typography, IconButton, Button } from '@material-ui/core';
import { Box, Container, Paper, Grid } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

import BasicData from '../components/profile/BasicData';
import SkillsForm from '../components/profile/SkillsForm';
import useStyles from '../static/profile/style';
import { callApi, checkAuth, redirectPage } from '../utils';

const TABS = {
  BASIC: 0,
  SKILLS: 1,
  INTERESTS: 2
};

const TabContent = ({ tab, student }) => {
  if (tab == TABS.BASIC) return <BasicData student={student} />;
  if (tab == TABS.SKILLS) return <SkillsForm student={student} />;
  else return null;
};

const ProfilePage = ({ student }) => {
  const classes = useStyles();

  const { firstName, lastName } = student.profile;
  const [tab, setTab] = useState(0);

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

      <Grid container alignItems='center'
        className={classes.profileMain}
        >
        <Grid item xs={12} container justify='center' style={{ margin: '.5rem' }}>
          <Avatar className={classes.profilePic} alt='Profile Picture'
            src={student.profile.photoUrl}
            />
        </Grid>
        <Grid item xs={12} container justify='center' style={{ margin: '.5rem' }}>
          <Typography component='h1' variant='h5'>{`${firstName} ${lastName}`}</Typography>
        </Grid>
      </Grid>

      <Paper elevation={8} className={`${classes.paper} ${classes.profilePaper}`}>
        <Grid container justify='space-around'>
          <Grid item xs={3} className={classes.tab}>
            <Button disableRipple 
              className={tab == TABS.BASIC ? classes.highlight : ''}
              onClick={() => setTab(TABS.BASIC)}
              >
              <h3 style={{ marginBottom: 0 }}>Basic</h3>
            </Button>
          </Grid>
          
          <Grid item xs={3} className={classes.tab}>
            <Button disableRipple 
              className={tab == TABS.SKILLS ? classes.highlight : ''}
              onClick={() => setTab(TABS.SKILLS)}
              >
              <h3 style={{ marginBottom: 0 }}>Skills</h3>
            </Button>
          </Grid>
          
          <Grid item xs={4} className={classes.tab}>
            <Button disableRipple 
              className={tab == TABS.INTERESTS ? classes.highlight : ''}
              onClick={() => setTab(TABS.INTERESTS)}
              >
              <h3 style={{ marginBottom: 0 }}>Interests</h3>
            </Button>
          </Grid>
        </Grid>
        
        <Box m={5}>
          <TabContent tab={tab} student={student} />
        </Box>
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
