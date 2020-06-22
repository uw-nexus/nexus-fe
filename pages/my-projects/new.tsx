import React, { useState } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { Container, Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 're-carousel';

import SideNav from 'components/SideNav';
import TitlePage from 'components/project/TitlePage';
import RadioPage from 'components/project/RadioPage';
import DescriptionPage from 'components/project/DescriptionPage';
import InterestsPage from 'components/project/InterestsPage';
import RolesAndSkillsPage from 'components/project/RolesAndSkillsPage';
import PostalPage from 'components/project/PostalPage';
import ExercisesPage from 'components/project/ExercisesPage';
import ProjectContent from 'components/project/ProjectContent';

import { Buttons, IndicatorText } from 'components/CarouselWidgets';
import { BE_ADDR, vh, redirectPage, callApi } from 'utils';
import { FONT } from 'public/static/styles/constants';
import { Project } from 'types';
import MainButton from 'components/MainButton';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
  },
  heading: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  title: {
    fontSize: FONT.HEADING,
    color: theme.palette.text.primary,
  },
  carousel: {
    '& > div': {
      overflow: 'scroll',
    },
  },
}));

type PageProps = {
  initialProject: Project;
  options: {
    durations: string[];
    sizes: string[];
    skills: string[];
    roles: string[];
    interests: string[];
  };
};

const PostProjectPage: NextPage<PageProps> = ({ initialProject, options }) => {
  const classes = useStyles();
  const [project, setProject] = useState(initialProject);
  const [fail, setFail] = useState('');

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

  const createProject = async (event): Promise<void> => {
    event.preventDefault();
    const { title, description, duration, size } = project.details;
    if (!title || !description || !duration || !size) {
      setFail(`Please fill in all steps`);
      return;
    }

    try {
      const res = await fetch(`${BE_ADDR}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(project),
      });

      const { projectId } = await res.json();
      Router.push(`/project/${projectId}`);
    } catch (error) {
      setFail(`Error creating project`);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" height="100%">
      <Container maxWidth="md" disableGutters>
        <Grid container className={classes.heading}>
          <Grid item xs={2}>
            <SideNav iconStyle={{ padding: 0, marginLeft: '.5rem' }} />
          </Grid>
          <Grid item xs={8}>
            <Box display="flex" justifyContent="space-evenly" alignItems="center" height="100%">
              <Typography align="center" className={classes.title}>
                Creating a Project
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Container className={classes.container} maxWidth="md" disableGutters>
        <Box height={`calc(100% - ${vh(10)})`}>
          <Carousel widgets={[IndicatorText, Buttons]} className={classes.carousel}>
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

            <Box
              height="100%"
              width="100%"
              paddingX="20%"
              display="flex"
              flexDirection="column"
              justifyContent="center"
            >
              <MainButton label="Publish" onClick={createProject} />
              {fail.length ? (
                <Box marginTop="1rem">
                  <Alert severity="error">{fail}</Alert>
                </Box>
              ) : null}
            </Box>
          </Carousel>
        </Box>
      </Container>
    </Box>
  );
};

PostProjectPage.getInitialProps = async (ctx): Promise<PageProps> => {
  try {
    // TODO: Add project type (currently merged into project status)
    const project: Project = {
      details: {
        title: '',
        description: '',
        status: '',
        duration: '',
        size: '',
        postal: '',
      },
      skills: [],
      roles: [],
      interests: [],
      exercises: {},
    };

    const options = await callApi(ctx, `${BE_ADDR}/options/projects`);

    return {
      initialProject: project,
      options,
    };
  } catch (error) {
    redirectPage(ctx, '/join');
  }
};

export default PostProjectPage;
