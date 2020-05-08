import React, { useState } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { Button, TextField, Typography, Grid, IconButton } from '@material-ui/core';
import { Container, Paper, Box } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import fetch from 'isomorphic-unfetch';

import withNavbar from 'components/Navbar';
import ArrayForm from 'components/ArrayForm';
import useStyles from 'public/static/styles/post';
import { BE_ADDR, checkAuth, redirectPage } from 'utils';

const PostProjectPage: NextPage = () => {
  const classes = useStyles();

  const [details, setDetails] = useState({
    title: '',
    description: '',
  });

  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);

  const handleChangeDetails = (name) => (event): void => {
    setDetails({
      ...details,
      [name]: event.target.value,
    });
  };

  const handleCreateProject = async (event): Promise<void> => {
    event.preventDefault();

    const res = await fetch(`${BE_ADDR}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(details),
    });

    const { projectId } = await res.json();

    await fetch(`${BE_ADDR}/projects/${projectId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ interests, skills }),
    });

    Router.push('/myprojects');
  };

  return (
    <Container component="main" maxWidth="xs" className={classes.outer}>
      <Paper elevation={2} className={classes.paper}>
        <form onSubmit={handleCreateProject}>
          <Grid container style={{ marginBottom: '.5rem' }}>
            <Grid item xs={3}>
              <IconButton aria-label="Back" onClick={(): void => Router.back()} style={{ padding: 0 }}>
                <ArrowBack fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item xs={6} container alignItems="center" justify="center">
              <Typography component="h1" variant="h5">
                Project
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Button type="submit" aria-label="Post" disableRipple color="primary" style={{ paddingRight: 0 }}>
                Post
              </Button>
            </Grid>
          </Grid>

          <TextField
            variant="outlined"
            margin="normal"
            id="project-title"
            name="project-title"
            label="Title"
            required
            fullWidth
            autoFocus
            onChange={handleChangeDetails('title')}
          />

          <TextField
            variant="outlined"
            margin="normal"
            id="project-desc"
            name="project-desc"
            label="Description"
            fullWidth
            multiline
            rows="5"
            onChange={handleChangeDetails('description')}
          />
        </form>

        <Box className={classes.chipBox}>
          <ArrayForm label="Skills Required" items={skills} setItems={setSkills} />
        </Box>

        <Box className={classes.chipBox}>
          <ArrayForm label="Fields of Interest" items={interests} setItems={setInterests} />
        </Box>
      </Paper>
    </Container>
  );
};

PostProjectPage.getInitialProps = async (ctx): Promise<{ authenticated: boolean }> => {
  const { authenticated } = await checkAuth(ctx);
  if (!authenticated) redirectPage(ctx, '/login');
  // TODO: fetch available db options from backend and return as props
  return { authenticated };
};

export default withNavbar(PostProjectPage);
