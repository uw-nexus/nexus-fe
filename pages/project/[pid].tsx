import React from 'react';
import Error from 'next/error';
import Router from 'next/router';
import { Avatar, Typography, IconButton, Link, Chip } from '@material-ui/core';
import { Box, Container, Paper, Grid } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

import useStyles from '../../static/project/style';
import { callApi, checkAuth, redirectPage } from '../../utils';

const Projectpage = ({ project }) => {
  const classes = useStyles();
  if (!project) return <Error statusCode={404} />

  const { details, skills, fields } = project;
  const { owner } = details;

  const formatDateForDisplay = (dateStr) => new Date(dateStr).toLocaleString().split(',')[0];

  return (
    <Container component='main' maxWidth='xs' className={classes.projectOuter}>
      <Grid container className={classes.projectNav}>
        <Grid item container xs={3} justify='center'>
          <IconButton onClick={() => Router.back()}>
            <ArrowBack fontSize='large' />
          </IconButton>
        </Grid>
      </Grid>

      <Paper className={classes.projectPaper}>
        <Box className={classes.projectMain}>
          <Grid container justify='space-between'>
            <Avatar className={classes.projectPic}
              variant='rounded'
              alt='Project Picture'
              src={''}
              />
            
            <Grid item xs={8} container justify='flex-end' alignItems='flex-end'>
              <Typography className={classes.grayed}>{details.status.toUpperCase()}</Typography>
            </Grid>
          </Grid>

          <Grid container alignItems='center' className={classes.projectBasic}>
            <Grid item xs={12} container direction='column'>
              <Typography component='h1' variant='h5'>{details.title}</Typography>
              <Typography className={classes.grayed}>{formatDateForDisplay(details.startDate)} - {formatDateForDisplay(details.endDate)}</Typography>
              <Typography><Link href={`/${owner.user.username}`}>{owner.firstName} {owner.lastName}</Link></Typography>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Paper className={classes.projectPaper}>
        <Typography component='h2' variant='h6'>Description</Typography>
        {details.description}
      </Paper>

      <Paper className={classes.projectPaper}>
        <Typography component='h2' variant='h6'>Skills Required</Typography>
        
        <Grid container spacing={1}
          style={{ marginTop: (skills.length ? '.5rem' : 0) }}
          justify={skills.length ? 'flex-start' : 'center'}
          alignItems={skills.length ? 'flex-start' : 'center'}
          >
          {skills.length
            ? skills.map(s => 
                <Grid item key={s}>
                  <Chip label={s} color='primary' />
                </Grid>
              )
            : <p style={{ color: 'grey' }}>N/A</p>
          }
        </Grid>
      </Paper>

      <Paper className={classes.projectPaper}>
        <Typography component='h2' variant='h6'>Fields of Interest</Typography>
        
        <Grid container spacing={1}
          style={{ marginTop: (fields.length ? '.5rem' : 0) }}
          justify={fields.length ? 'flex-start' : 'center'}
          alignItems={fields.length ? 'flex-start' : 'center'}
          >
          {fields.length
            ? fields.map(s => 
                <Grid item key={s}>
                  <Chip label={s} color='primary' />
                </Grid>
              )
            : <p style={{ color: 'grey' }}>N/A</p>
          }
        </Grid>
      </Paper>
    </Container>
  );
}

Projectpage.getInitialProps = async (ctx) => {
  const { authenticated } = await checkAuth(ctx);
  if (!authenticated) redirectPage(ctx, '/login');

  const { pid } = ctx.query;
  const project = await callApi(ctx, `http://localhost:3100/projects/${pid}`);
  return { project };
}

export default Projectpage;
