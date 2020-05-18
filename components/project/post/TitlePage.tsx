import React from 'react';
import { TextField, Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FONT } from 'public/static/styles/constants';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(4),
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

export default ({ handleChange }): JSX.Element => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box paddingX="1rem" marginTop="1rem" marginBottom="3rem">
        <Typography align="center" className={classes.text}>
          {`Mine was “Build a Web App”, so users could understand what the project outcome would be.`}
        </Typography>
      </Box>
      <Box minHeight="80%">
        <Typography className={classes.title}>{`Project Title`}</Typography>
        <TextField
          variant="outlined"
          margin="normal"
          label="Title of your project's post"
          id="title"
          name="title"
          fullWidth
          required
          onChange={handleChange('title')}
        />
      </Box>
    </Box>
  );
};
