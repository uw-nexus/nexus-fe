import React, { useState } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { Container, Box, Grid, Typography, IconButton, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 're-carousel';

import TitlePage from 'components/project/TitlePage';
import RadioPage from 'components/project/RadioPage';
import DescriptionPage from 'components/project/DescriptionPage';
import InterestsPage from 'components/project/InterestsPage';
import RolesAndSkillsPage from 'components/project/RolesAndSkillsPage';
import PostalPage from 'components/project/PostalPage';
import ExercisesPage from 'components/project/ExercisesPage';
import ProjectContent from 'components/project/ProjectContent';

import { Buttons } from 'components/CarouselWidgets';
import { FE_ADDR, BE_ADDR, vh, redirectPage, callApi } from 'utils';
import { FONT } from 'public/static/styles/constants';
import { Project } from 'types';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
  },
  heading: {
    padding: theme.spacing(4),
    paddingTop: theme.spacing(2),
  },
  title: {
    fontSize: FONT.HEADING,
    color: theme.palette.text.primary,
  },
  save: {
    height: vh(20),
    position: 'fixed',
    zIndex: 999,
    bottom: vh(0),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  btnText: {
    fontWeight: 'bold',
    color: theme.palette.primary.light,
    fontSize: FONT.ACTION_BTN,
  },
}));

type PageProps = {
  initialProject: Project;
  projectId: string;
  options: {
    durations: string[];
    sizes: string[];
    skills: string[];
    roles: string[];
    interests: string[];
  };
};

const EditProjectPage: NextPage<PageProps> = ({ initialProject, projectId, options }) => {
  const classes = useStyles();
  const [project, setProject] = useState(initialProject);
  const [fail, setFail] = useState(false);

  const handleStringData = (field) => (event): void => {
    setProject({
      ...project,
      details: {
        ...project.details,
        [field]: event.target.value,
      },
    });
  };

  const handleArrayData = (field, items): void => {
    setProject({
      ...project,
      [field]: items,
    });
  };

  const handleExercises = (role, event): void => {
    if (role.length === 0) return;
    if ((event.target.value as string).length === 0 && role in project.exercises) {
      delete project.exercises[role];
      return;
    }

    setProject({
      ...project,
      exercises: {
        ...project.exercises,
        [role]: event.target.value,
      },
    });
  };

  const saveProject = async (event): Promise<void> => {
    event.preventDefault();
    try {
      await fetch(`${BE_ADDR}/projects/${projectId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(project),
      });

      sessionStorage.removeItem('projectEdit');
      Router.push(`/project/${projectId}`);
    } catch (error) {
      setFail(true);
      setTimeout((): void => setFail(false), 5000);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" height="100%">
      <Container maxWidth="md" disableGutters>
        <Grid container className={classes.heading}>
          <Grid item xs={2}>
            <IconButton
              style={{ padding: 0, marginLeft: '-10px' }}
              onClick={(): void => {
                sessionStorage.removeItem('projectEdit');
                Router.back();
              }}
            >
              <img src="/static/assets/back.svg" alt="back" />
            </IconButton>
          </Grid>
          <Grid item xs={8}>
            <Box display="flex" justifyContent="space-evenly" alignItems="center" height="100%">
              <Typography align="center" className={classes.title}>
                Edit Project
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Container className={classes.container} maxWidth="md" disableGutters>
        <Box height={`calc(100% - ${vh(10)})`}>
          <Carousel widgets={[Buttons]}>
            <TitlePage project={project} handleChange={handleStringData} />
            <RadioPage
              project={project}
              teamSizeOpts={options.sizes}
              durationOpts={options.durations}
              projectTypeOpts={['New Project', 'Ongoing Project']}
            />
            <DescriptionPage project={project} handleChange={handleStringData} />
            <InterestsPage project={project} handleChange={handleArrayData} options={options.interests} />
            <RolesAndSkillsPage
              project={project}
              handleChange={handleArrayData}
              roleOpts={options.roles}
              skillOpts={options.skills}
            />
            <PostalPage project={project} handleChange={handleStringData} />
            <ExercisesPage project={project} handleChange={handleExercises} />
            <ProjectContent project={project} />
          </Carousel>
        </Box>
      </Container>

      <Box className={classes.save}>
        <Box height={vh(10)}>{fail ? <Alert severity="error">{`Failed to update project.`}</Alert> : null}</Box>
        <Button disableRipple onClick={saveProject}>
          <Typography className={classes.btnText}>{`Save and Exit`}</Typography>
        </Button>
      </Box>
    </Box>
  );
};

EditProjectPage.getInitialProps = async (ctx): Promise<PageProps> => {
  try {
    let project: Project;
    const { pid } = ctx.query;

    if (typeof window !== 'undefined') {
      project = JSON.parse(sessionStorage.getItem('projectEdit')) || project;
      sessionStorage.removeItem('projectEdit');
    } else {
      const res = await callApi(ctx, `${FE_ADDR}/api/project/${pid}`);
      project = res.project;
    }

    const options = await callApi(ctx, `${BE_ADDR}/options/projects`);

    return {
      initialProject: project,
      projectId: pid as string,
      options,
    };
  } catch (error) {
    redirectPage(ctx, '/login');
  }
};

export default EditProjectPage;
