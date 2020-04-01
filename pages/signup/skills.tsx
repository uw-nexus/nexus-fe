import React, { useState } from 'react';
import Router from 'next/router';
import { Box, Button, Container, Paper, Typography } from '@material-ui/core';
import fetch from 'isomorphic-unfetch';

import ArrayForm from '../../components/ArrayForm';
import useStyles from '../../static/auth/style';
import { checkAuth, redirectPage } from '../../utils';

const SkillsSignup = () => {
  const classes = useStyles();
  const [skills, setSkills] = useState([]);

  const updateSkills = async (event) => {
    event.preventDefault();
    await fetch(`${process.env.BE_ADDR}/students`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ skills })
    });
    Router.push('/');
  }

  return (
    <Container component='main' maxWidth='xs' className={classes.outer}>
      <Paper elevation={2} className={classes.paper}>
        <Typography component='h1' variant='h5'>
          {'Skills & Tools'}
        </Typography>
        
        <Box marginTop='2rem' marginBottom='5rem'>
          <ArrayForm label='Skill' items={skills} setItems={setSkills} />
        </Box>
        
        <Button fullWidth variant='contained' color='primary' className={classes.submit} onClick={updateSkills}>
          NEXT
        </Button>
      </Paper>
    </Container>
  );
}

SkillsSignup.getInitialProps = async (ctx) => {
  const { authenticated } = await checkAuth(ctx);
  if (!authenticated) redirectPage(ctx, '/login');
  return { authenticated };
}

export default SkillsSignup;
