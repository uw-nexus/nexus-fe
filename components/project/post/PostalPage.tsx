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
  inner: {
    minHeight: '80%',
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
          {`By providing a zip code, I was able to work with people that live around me.`}
        </Typography>
      </Box>
      <Box minHeight="80%">
        <Typography className={classes.title}>{`Location`}</Typography>
        <TextField
          variant="outlined"
          margin="normal"
          label="Zip Code"
          id="zip"
          name="zip"
          fullWidth
          onChange={handleChange('postal')}
        />
      </Box>
    </Box>
  );
};
