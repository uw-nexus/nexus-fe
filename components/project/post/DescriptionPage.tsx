import React from 'react';
import { TextField, Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import HelpButton from 'components/HelpButton';
import { FONT } from 'public/static/styles/constants';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(4),
    overflow: 'scroll',
  },
  text: {
    fontSize: FONT.GUIDE,
    color: theme.palette.text.secondary,
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

  return (
    <Box className={classes.container}>
      <Box minHeight="80%">
        <Box display="flex">
          <Typography className={classes.title}>{`Project Description`}</Typography>
          <HelpButton
            text={`A project description helps users understand overall project idea, information of your team, and anything unique about your project.`}
          />
        </Box>

        <TextField
          variant="outlined"
          margin="normal"
          id="description"
          name="description"
          fullWidth
          required
          multiline
          rows={20}
          inputProps={{
            maxLength: 5000,
          }}
          value={project.details.description}
          onChange={handleChange('description')}
        />
      </Box>
    </Box>
  );
};
