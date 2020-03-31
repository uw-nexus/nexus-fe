import React from 'react';
import { Container, Grid } from '@material-ui/core';

import withNavbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import useStyles from '../static/auth/style';
import { checkAuth, redirectPage, callApi } from '../utils';

const HomePage = ({ projects }) => {
  const classes = useStyles();

  return (
    <Container component='main' maxWidth='xs' className={classes.outer}>
      <Grid container justify='space-around'>
        { projects.map(p =>
            <Grid item xs={12} key={p.projectId}>
              <ProjectCard {...p} />
            </Grid>)
        }
      </Grid>
    </Container>
  );
}

HomePage.getInitialProps = async (ctx) => {
  const { authenticated } = await checkAuth(ctx);
  if (!authenticated) redirectPage(ctx, '/login');
  
  const projects = await callApi(ctx, `${process.env.FE_ADDR}/api/search/projects`);
  return { projects };
}

export default withNavbar(HomePage);
