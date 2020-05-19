import React, { useState } from 'react';
import { NextPage } from 'next';
import { Container, Box, Grid, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 're-carousel';

import TitlePage from 'components/project/post/TitlePage';
import DescriptionPage from 'components/project/post/DescriptionPage';
import PostalPage from 'components/project/post/PostalPage';
import InterestsPage from 'components/project/post/InterestsPage';
import RolesPage from 'components/project/post/RolesPage';
import SkillsPage from 'components/project/post/SkillsPage';
import TeamSizePage from 'components/project/post/TeamSizePage';
import DurationPage from 'components/project/post/DurationPage';
import ProjectTypePage from 'components/project/post/ProjectTypePage';

import { Buttons, IndicatorText } from 'components/CarouselWidgets';
import { BE_ADDR, vh, redirectPage, callApi } from 'utils';
import { FONT } from 'public/static/styles/constants';
import { Project } from 'types';

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
}));

type PageProps = {
  initialProject: Project;
  durationChoices: string[];
  teamSizeChoices: string[];
};

const PostProjectPage: NextPage<PageProps> = ({ initialProject, durationChoices, teamSizeChoices }) => {
  const classes = useStyles();
  const [project, setProject] = useState(initialProject);

  const handleStringData = (field) => (event): void => {
    setProject({
      ...project,
      details: {
        ...project.details,
        [field]: event.target.value,
      },
    });
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" height="100%">
      <Container maxWidth="sm" disableGutters>
        <Grid container className={classes.heading}>
          <Grid item xs={2}>
            <IconButton style={{ padding: 0, marginLeft: '-10px' }}>
              <img src="/static/assets/menu.svg" alt="menu" />
            </IconButton>
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

      <Container className={classes.container} maxWidth="sm" disableGutters>
        <Box height={`calc(100% - ${vh(10)})`}>
          <Carousel widgets={[IndicatorText, Buttons]}>
            <TitlePage project={project} handleChange={handleStringData} />
            <DescriptionPage project={project} handleChange={handleStringData} />
            <InterestsPage project={project} />
            <RolesPage project={project} />
            <SkillsPage project={project} />
            <PostalPage project={project} handleChange={handleStringData} />
            <TeamSizePage project={project} choices={teamSizeChoices} />
            <DurationPage project={project} choices={durationChoices} />
            <ProjectTypePage project={project} choices={['New Project', 'Ongoing Project']} />
          </Carousel>
        </Box>
      </Container>
    </Box>
  );
};

PostProjectPage.getInitialProps = async (ctx): Promise<PageProps> => {
  try {
    // TODO: Add project type (currently merged into project status)
    const choices = await callApi(ctx, `${BE_ADDR}/choices/projects`);
    let project: Project = {
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
    };

    if (typeof window !== 'undefined') {
      project = JSON.parse(localStorage.getItem('project')) || project;
      localStorage.removeItem('project');
    }

    return {
      initialProject: project,
      durationChoices: choices.durations,
      teamSizeChoices: choices.sizes,
    };
  } catch (error) {
    redirectPage(ctx, '/join');
  }
};

export default PostProjectPage;
