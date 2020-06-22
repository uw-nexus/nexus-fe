import React from 'react';
import { TextField, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HelpButton from 'components/HelpButton';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
    </Box>
  );
};
