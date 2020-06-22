import React, { useState } from 'react';
import { TextField, Typography, Select } from '@material-ui/core';
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
  const [role, setRole] = useState(project.roles.length > 0 ? project.roles[0] : '');
  const [exercise, setExercise] = useState(project.exercises[role]);

  return (
    <Box className={classes.container}>
      <Box minHeight="80%">
        <Box display="flex">
          <Typography className={classes.title}>{`Screening Exercises`}</Typography>
          <HelpButton
            text={`Good exercise descriptions include a clear direction and your vision. Example: "Create a logo for the product that we are building. Use #F05A28 as a primary color. It should look minimal and include a horse head."`}
          />
        </Box>

        <Box marginTop="1rem">
          <Select
            native
            fullWidth
            value={role}
            variant="outlined"
            disabled={project.roles.length === 0}
            inputProps={{ name: 'active-role', id: 'active-role' }}
            onChange={(e): void => {
              setRole(e.target.value as string);
              setExercise(project.exercises[e.target.value as string] || '');
            }}
          >
            {project.roles.length ? null : <option value="">{'No roles found'}</option>}
            {project.roles.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </Box>

        <TextField
          variant="outlined"
          margin="normal"
          id="exercise"
          name="exercise"
          fullWidth
          required
          multiline
          rows={15}
          disabled={role.length === 0}
          inputProps={{
            maxLength: 5000,
          }}
          value={exercise}
          onChange={(e): void => {
            setExercise(e.target.value);
            handleChange(role, e);
          }}
        />
      </Box>
    </Box>
  );
};
