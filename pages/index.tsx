import React, { useState } from 'react';
import { NextPage } from 'next';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import withNavbar from 'components/Navbar';
import SearchBar from 'components/search/SearchBar';
import ProjectCard from 'components/ProjectCard';
import { FE_ADDR, redirectPage, callApi } from 'utils';
import { ProjectDetails } from 'types';

const useStyles = makeStyles(() => ({
  outer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100% - 6rem)',
    marginTop: '6rem',
  },
}));

type PageProps = {
  initialProjects: ProjectDetails[];
};

const HomePage: NextPage<PageProps> = ({ initialProjects }) => {
  const classes = useStyles();
  const [projects, setProjects] = useState(initialProjects);

  return (
    <>
      <SearchBar setProjects={setProjects} />
      <Container component="main" maxWidth="xs" className={classes.outer}>
        <Grid container justify="space-around">
          {projects.map((p) => (
            <Grid item xs={12} key={p.projectId}>
              <ProjectCard {...p} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

HomePage.getInitialProps = async (ctx): Promise<PageProps> => {
  try {
    const initialProjects = await callApi(ctx, `${FE_ADDR}/api/search/projects`);
    return { initialProjects };
  } catch (error) {
    redirectPage(ctx, '/login');
  }
};

export default withNavbar(HomePage);
