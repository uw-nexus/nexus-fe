import React, { useState } from 'react';
import { NextPage } from 'next';
import { Container, Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 're-carousel';

import SideNav from 'components/SideNav';
import TitlePage from 'components/project/TitlePage';
import RadioPage from 'components/project/RadioPage';
import DescriptionPage from 'components/project/DescriptionPage';
import InterestsPage from 'components/project/InterestsPage';
import RolesAndSkillsPage from 'components/project/RolesAndSkillsPage';
import PostalPage from 'components/project/PostalPageCreate';

import { Buttons, IndicatorDots } from 'components/CarouselWidgets';
import { BE_ADDR, vh, redirectPage, callApi } from 'utils';
import { FONT } from 'public/static/styles/constants';
import { Project } from 'types';

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

  const handleStringData = (field) => (event): void => {
    setProject({
      ...project,
      details: {
        ...project.details,
        [field]: event.target.value,
      },
    });
  };

  const handleArrayData = (field) => (items): void => {
    setProject({
      ...project,
      [field]: items,
    });
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
          <Carousel widgets={[IndicatorDots, Buttons]}>
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
          </Carousel>
        </Box>
      </Container>
    </Box>
  );
};

PostProjectPage.getInitialProps = async (ctx): Promise<PageProps> => {
  try {
    // TODO: Add project type (currently merged into project status)
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
      project = JSON.parse(sessionStorage.getItem('project')) || project;
      sessionStorage.removeItem('project');
    }

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
