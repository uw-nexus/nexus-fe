import React, { useState } from 'react';
import Router from 'next/router';
import { Button, TextField, Typography, Grid, IconButton } from '@material-ui/core';
import { Container, Paper, Box } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import fetch from 'isomorphic-unfetch';

import withNavbar from '../components/Navbar';
import ArrayForm from '../components/ArrayForm';
import useStyles from '../static/post/style';
import { checkAuth, redirectPage, formatDateBE } from '../utils';

const PostProjectPage = () => {
  const classes = useStyles();

  const [details, setDetails] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: ''
  });

  const [skills, setSkills] = useState([]);
  const [fields, setFields] = useState([]);

  const handleChangeDetails = (name) => (event) => {
    setDetails({
      ...details,
      [name]: event.target.value
    });
  };

  const handleCreateProject = async (event) => {
    event.preventDefault();

    try {
      details.startDate = formatDateBE(details.startDate);
      details.endDate = formatDateBE(details.endDate);
    } catch {
      details.startDate = '';
      details.endDate = '';
    }

    const res = await fetch(`${process.env.BE_ADDR}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(details)
    });

    const { projectId } = await res.json();
    
    await fetch(`${process.env.BE_ADDR}/projects/${projectId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ fields, skills })
    });

    Router.push('/myprojects');
  }

  return (
    <Container component='main' maxWidth='xs' className={classes.outer}>
      <Paper elevation={2} className={classes.paper}>
        <form onSubmit={handleCreateProject}>
          <Grid container style={{ marginBottom: '.5rem' }}>
            <Grid item xs={3}>
              <IconButton onClick={() => Router.back()} style={{ padding: 0 }}>
                <ArrowBack fontSize='large' />
              </IconButton>
            </Grid>
            <Grid item xs={6} container alignItems='center' justify='center'>
              <Typography component='h1' variant='h5'>
                Project
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Button type='submit' disableRipple color='primary' style={{ paddingRight: 0 }}>
                Post
              </Button>
            </Grid>
          </Grid>

          <TextField
            variant='outlined' margin='normal'
            id='project-title' name='project-title'
            label='Title' required
            fullWidth autoFocus
            onChange={handleChangeDetails('title')}
          />

          <Grid container spacing={2} justify='space-between'>
            <Grid item xs={6}>
              <TextField
                variant='outlined' margin='normal'
                id='project-start' name='project-start'
                label='Start Date' fullWidth
                onChange={handleChangeDetails('startDate')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant='outlined' margin='normal'
                id='project-end' name='project-end'
                label='End Date' fullWidth
                onChange={handleChangeDetails('endDate')}
              />
            </Grid>
          </Grid>

          <TextField
            variant='outlined' margin='normal'
            id='project-desc' name='project-desc'
            label='Description'
            fullWidth multiline rows='5'
            onChange={handleChangeDetails('description')}
          />
        </form>

        <Box className={classes.chipBox}>
          <ArrayForm label='Skills Required' items={skills} setItems={setSkills} />
        </Box>

        <Box className={classes.chipBox}>
          <ArrayForm label='Fields of Interest' items={fields} setItems={setFields} />
        </Box>
      </Paper>
    </Container>
  );
}

PostProjectPage.getInitialProps = async (ctx) => {
  const { authenticated } = await checkAuth(ctx);
  if (!authenticated) redirectPage(ctx, '/login');
  // TODO: fetch available db options from backend and return as props
  return { authenticated };
}

export default withNavbar(PostProjectPage);
