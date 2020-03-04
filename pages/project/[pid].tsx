import React, { useState } from 'react';
import Error from 'next/error';
import Router from 'next/router';
import { Avatar, Typography, IconButton, Link, Chip, Button } from '@material-ui/core';
import { Box, Container, Paper, Grid } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

import useStyles from '../../static/project/style';
import { callApi, checkAuth, redirectPage } from '../../utils';

const ProjectActionButton = ({ relationship, projectId, startDate, endDate }) => {
  const classes = useStyles();
  const [rel, setRel] = useState(relationship);
  
  try {
    startDate = new Date(startDate).toISOString().split('T')[0];
    endDate = new Date(endDate).toISOString().split('T')[0];
  } catch {
    startDate = '';
    endDate = '';
  }

  const handleJoin = async () => {
    const res = await fetch(`${process.env.FE_ADDR}/api/contract`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ projectId, startDate, endDate })
    });

    if (res.ok) setRel('Pending');
  }

  switch (rel) {
    case 'Owner':
      return (
        <Button fullWidth variant='contained' color='primary' className={classes.actionButton}>
          Manage
        </Button>
      );
    case '':
      return (
        <Button fullWidth variant='contained' color='primary' className={classes.actionButton} onClick={handleJoin}>
          Join
        </Button>
      );
    default:
      return (
        <Button fullWidth variant='contained' color='primary' className={classes.actionButton} disabled>
          {rel}
        </Button>
      );
  }
}

const ProjectPage = ({ project, projectId, relationship }) => {
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
              <Typography color='textSecondary'>{details.status.toUpperCase()}</Typography>
            </Grid>
          </Grid>

          <Grid container alignItems='center' className={classes.projectBasic}>
            <Grid item xs={12} container direction='column'>
              <Typography component='h1' variant='h5'>{details.title}</Typography>
              <Typography color='textSecondary'>{formatDateForDisplay(details.startDate)} - {formatDateForDisplay(details.endDate)}</Typography>
              <Typography>
                <Link href={`/${owner.user.username}`} color='inherit' style={{ fontWeight: 'bold' }}>
                  {owner.firstName} {owner.lastName}
                </Link>
              </Typography>
            </Grid>
          </Grid>

          <ProjectActionButton
            relationship={relationship}
            projectId={projectId}
            startDate={new Date()}
            endDate={details.endDate}
          />
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

ProjectPage.getInitialProps = async (ctx) => {
  const { authenticated } = await checkAuth(ctx);
  if (!authenticated) redirectPage(ctx, '/login');

  const { pid } = ctx.query;
  const { project, projectId, relationship } = await callApi(ctx, `${process.env.FE_ADDR}/api/project/${pid}`);
  return { project, projectId, relationship };
}

export default ProjectPage;
