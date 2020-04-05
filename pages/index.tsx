import React, { useState } from 'react';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import withNavbar from '../components/Navbar';
import Search from '../components/Search';
import ProjectCard from '../components/ProjectCard';
import { FE_ADDR, redirectPage, callApi } from '../utils';

const useStyles = makeStyles(() => ({
  outer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100% - 6rem)',
    marginTop: '6rem'
  }
}));

const HomePage = ({ initialProjects }) => {
  const classes = useStyles();
  const [projects, setProjects] = useState(initialProjects);

  return (
    <>
      <Search setProjects={setProjects} />
      <Container component='main' maxWidth='xs' className={classes.outer}>
        <Grid container justify='space-around'>
          { projects.map(p =>
              <Grid item xs={12} key={p.projectId}>
                <ProjectCard {...p} />
              </Grid>)
          }
        </Grid>
      </Container>
    </>
  );
}

HomePage.getInitialProps = async (ctx) => {
  try {
    const initialProjects = await callApi(ctx, `${FE_ADDR}/api/search/projects`);
    return { initialProjects };
  } catch (error) {
    redirectPage(ctx, '/login');
  }
}

export default withNavbar(HomePage);
