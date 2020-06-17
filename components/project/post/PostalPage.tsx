import React, { useState } from 'react';
import Router from 'next/router';
import { TextField, Typography, Box } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import HelpButton from 'components/HelpButton';
import MainButton from 'components/MainButton';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4),
  },
  title: {
    paddingLeft: theme.spacing(1),
    marginRight: theme.spacing(5),
    fontWeight: 'bold',
    color: theme.palette.text.primary,
  },
}));

export default ({ project, handleChange }): JSX.Element => {
  const classes = useStyles();
  const [fail, setFail] = useState(false);

  const saveProject = async (event): Promise<void> => {
    event.preventDefault();
    const { title, description, duration, size } = project.details;
    if (!title || !description || !duration || !size) {
      setFail(true);
      return;
    }

    sessionStorage.setItem('project', JSON.stringify(project));
    Router.push('/project/post/review');
  };

  return (
    <Box className={classes.container}>
      <Box minHeight="80%">
        <Box display="flex">
          <Typography className={classes.title}>{`Location`}</Typography>
          <HelpButton text={`A postal code allows users to know if the team can meet up in-person.`} />
        </Box>
        <TextField
          variant="outlined"
          margin="normal"
          label="Postal"
          id="postal"
          name="postal"
          fullWidth
          value={project.details.postal}
          onChange={handleChange('postal')}
        />
      </Box>

      <Box width="100%" paddingX="20%">
        <form onSubmit={saveProject}>
          <MainButton type="submit" label="Continue" />
          {fail ? (
            <Box marginTop="1rem">
              <Alert severity="error">{`Please fill in all steps.`}</Alert>
            </Box>
          ) : null}
        </form>
      </Box>
    </Box>
  );
};
