import React, { useState } from 'react';
import { NextPage } from 'next';
import { Container, Box, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SearchBar from 'components/search/SearchBar';
import ProjectCard from 'components/ProjectCard';
import { FE_ADDR, redirectPage, callApi } from 'utils';
import { Project } from 'types';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    marginTop: theme.spacing(38),
  },
  controls: {
    position: 'fixed',
    top: 0,
    width: '100%',
    backgroundColor: 'white',
    zIndex: 10,
  },
}));

const HomeNav = (): JSX.Element => (
  <Box>
    <IconButton>
      <img src="/static/assets/menu.svg" alt="menu" />
    </IconButton>
  </Box>
);

type PageProps = {
  initialProjects: Project[];
};

const HomePage: NextPage<PageProps> = ({ initialProjects }) => {
  const classes = useStyles();
  const [projects, setProjects] = useState(initialProjects);
  const content = projects.map((p) => <ProjectCard key={p.details.projectId} {...p} />);

  return (
    <>
      <Box className={classes.controls}>
        <HomeNav />
        <SearchBar setProjects={setProjects} />
      </Box>
      <Container component="main" maxWidth="xs" className={classes.content}>
        <Box>{content}</Box>
      </Container>
    </>
  );
};

HomePage.getInitialProps = async (ctx): Promise<PageProps> => {
  try {
    const initialProjects = await callApi(ctx, `${FE_ADDR}/api/search/projects`);
    return { initialProjects };
  } catch (error) {
    redirectPage(ctx, '/join');
  }
};

export default HomePage;
