import React from 'react';
import { Box, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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
    fontWeight: 'bold',
    color: theme.palette.text.primary,
  },
}));

export default ({ student, handleChange }): JSX.Element => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box paddingX="1rem" marginTop="1rem" marginBottom="3rem">
        <Typography align="center" className={classes.text}>
          {'What do you want to tell people about yourself in a sentence? :)'}
        </Typography>
      </Box>
      <Box minHeight="80%">
        <Typography className={classes.title}>About</Typography>
        <TextField
          variant="outlined"
          margin="normal"
          id="bio"
          name="bio"
          fullWidth
          required
          multiline
          rows={10}
          inputProps={{
            maxLength: 5000,
          }}
          value={student.profile.bio}
          onChange={(e): void => handleChange('bio', e.target.value)}
        />
      </Box>
    </Box>
  );
};
