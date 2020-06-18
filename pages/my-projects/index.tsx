import React from 'react';
import { NextPage } from 'next';
import { Container, Typography, Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SideNav from 'components/SideNav';
import ProjectCard from 'components/ProjectCard';
import MainButton from 'components/MainButton';
import { FONT, COLORS } from 'public/static/styles/constants';
import { BE_ADDR, callApi, redirectPage, vh } from 'utils';
import { getProjects } from 'utils/search';
import { Project } from 'types';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingBottom: vh(10),
  },
  heading: {
    paddingTop: theme.spacing(2),
  },
  title: {
    fontSize: FONT.HEADING,
    color: theme.palette.text.primary,
  },
  actionContainer: {
    position: 'fixed',
    bottom: 0,
    height: vh(15),
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTop: `1px solid ${COLORS.GRAY_DA}`,
  },
}));

type PageProps = {
  projects: Project[];
  saved: string[];
};

const MyProjectsPage: NextPage<PageProps> = ({ projects, saved }) => {
  const classes = useStyles();

  const content = projects.length ? (
    projects.map((p) => <ProjectCard key={p.details.projectId} {...p} saved={saved.includes(p.details.projectId)} />)
  ) : (
    <Box minHeight={vh(70)} display="flex" justifyContent="center" alignItems="center">
      <Typography color="textSecondary">{'You don’t have any projects yet.'}</Typography>
    </Box>
  );

  return (
    <>
      <Container maxWidth="xs" disableGutters>
        <Grid container className={classes.heading}>
          <Grid item xs={2}>
            <SideNav iconStyle={{ padding: 0, marginLeft: '.5rem' }} />
          </Grid>
          <Grid item xs={8}>
            <Box display="flex" justifyContent="space-evenly" alignItems="center" height="100%">
              <Typography align="center" className={classes.title}>
                {'My Projects'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Container component="main" maxWidth="xs" className={classes.content}>
        <Box>{content}</Box>
      </Container>

      <Box className={classes.actionContainer}>
        <Container maxWidth="xs" disableGutters>
          <Box paddingX="20%">
            <MainButton href="/my-projects/new" label={`Create a Project`} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

MyProjectsPage.getInitialProps = async (ctx): Promise<PageProps> => {
  try {
    const owned = await callApi(ctx, `${BE_ADDR}/projects/owned`);
    const projectIds = owned.map((p) => String(p.projectId));
    const projects = await getProjects(projectIds);
    const saved = await callApi(ctx, `${BE_ADDR}/saved`);

    return { projects, saved: saved.projects };
  } catch (error) {
    redirectPage(ctx, '/login');
  }
};

export default MyProjectsPage;
