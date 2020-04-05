import React, { useState } from 'react';
import Error from 'next/error';
import Router from 'next/router';
import { Avatar, Typography, IconButton, Link, Button } from '@material-ui/core';
import { Box, Container, Paper, Grid } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

import withNavbar from '../../components/Navbar';
import BasicData from '../../components/project/BasicData';
import ProjectContracts from '../../components/project/ProjectContracts';
import useStyles from '../../static/project/style';
import { BE_ADDR, FE_ADDR, callApi, redirectPage, formatDateFE } from '../../utils';

const MODES = {
  MAIN: 0,
  EDIT: 1,
  MANAGE: 2
};

const ProjectPageContent = ({ mode, project, contracts }) => {
  if (mode == MODES.MANAGE) return <ProjectContracts contracts={contracts} />;
  else return <BasicData project={project} edit={mode == MODES.EDIT} />;
};

const ProjectActionButton = ({ relationship, projectId, project, mode, setMode }) => {
  const classes = useStyles();
  const [rel, setRel] = useState(relationship);

  const handleJoin = async () => {
    const res = await fetch(`${FE_ADDR}/api/contract`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ 
        projectId, 
        startDate: new Date().toISOString().split('T')[0], 
        endDate: project.details.endDate
      })
    });

    if (res.ok) setRel('Pending');
  };

  const handleDoneEdit = async () => {
    if (mode == MODES.EDIT) {
      const res = await fetch(`${BE_ADDR}/projects/${projectId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(project)
      });

      if (!res.ok) return;
    }
    
    setMode(MODES.MAIN);
  }

  switch (rel) {
    case 'Owner':
      return (mode == MODES.MAIN
        ? <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button fullWidth variant='contained' color='primary' 
                className={classes.actionButton} 
                onClick={() => setMode(MODES.EDIT)}>
                Edit
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button fullWidth variant='contained' color='primary' 
                className={classes.actionButton} 
                onClick={() => setMode(MODES.MANAGE)}>
                Manage
              </Button>
            </Grid>
          </Grid>
        : <Button fullWidth variant='contained' color='primary' 
            className={classes.actionButton} 
            onClick={handleDoneEdit}>
            Done
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

const ProjectPage = ({ project, projectId, relationship, contracts }) => {
  const classes = useStyles();
  if (!project) return <Error statusCode={404} />

  const [mode, setMode] = useState(MODES.MAIN);
  const { details } = project;
  const { owner } = details;

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
              <Typography color='textSecondary'>{formatDateFE(details.startDate)} - {formatDateFE(details.endDate)}</Typography>
              <Typography>
                <Link href={`/user/${owner.user.username}`} color='inherit' style={{ fontWeight: 'bold' }}>
                  {owner.firstName} {owner.lastName}
                </Link>
              </Typography>
            </Grid>
          </Grid>

          <ProjectActionButton
            relationship={relationship}
            projectId={projectId}
            project={project}
            mode={mode}
            setMode={setMode}
          />
        </Box>
      </Paper>

      <ProjectPageContent mode={mode} project={project} contracts={contracts} />
    </Container>
  );
}

ProjectPage.getInitialProps = async (ctx) => {
  try {
    const { pid } = ctx.query;
    const props = await callApi(ctx, `${FE_ADDR}/api/project/${pid}`);
    return props;
  } catch (error) {
    redirectPage(ctx, '/login');
  }
}

export default withNavbar(ProjectPage);
