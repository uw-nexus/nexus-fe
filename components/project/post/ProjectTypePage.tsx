import React, { useState } from 'react';
import Router from 'next/router';
import { Box, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

import RadioForm from 'components/RadioForm';
import MainButton from 'components/MainButton';
import { FONT } from 'public/static/styles/constants';
import { vh } from 'utils';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(4),
  },
  inner: {
    minHeight: '80%',
    paddingBottom: vh(7),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: FONT.GUIDE,
    color: theme.palette.text.secondary,
  },
  title: {
    paddingLeft: theme.spacing(1),
    fontWeight: 'bold',
    color: theme.palette.text.primary,
  },
}));

export default ({ project, choices }): JSX.Element => {
  const classes = useStyles();
  const [fail, setFail] = useState(false);

  const [status, setStatus] = useState(project.details.status);
  project.details.status = status;

  const saveProject = async (event): Promise<void> => {
    event.preventDefault();
    const { title, description, duration, size } = project.details;
    if (!title || !description || !duration || !size) {
      setFail(true);
      return;
    }

    localStorage.setItem('project', JSON.stringify(project));
    Router.push('/project/post/review');
  };

  return (
    <Box className={classes.container}>
      <Box paddingX="1rem" marginTop="1rem" marginBottom="3rem">
        <Typography align="center" className={classes.text}>
          {`The type of project I had was a new project where we started from a scratch.`}
        </Typography>
      </Box>
      <form onSubmit={saveProject} className={classes.inner}>
        <Box width="100%">
          <Typography className={classes.title}>{`Type of Project`}</Typography>
          <RadioForm value={status} setValue={setStatus} choices={choices} />
        </Box>
        <Box width="100%" paddingX="20%">
          <MainButton type="submit" label="Continue" />
          {fail ? (
            <Box marginTop="1rem">
              <Alert severity="error">{`Please fill in all steps.`}</Alert>
            </Box>
          ) : null}
        </Box>
      </form>
    </Box>
  );
};
