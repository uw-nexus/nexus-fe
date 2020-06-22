import React, { useState } from 'react';
import { TextField, Typography } from '@material-ui/core';
import { Box } from '@material-ui/core';
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
  const [focus, setFocus] = useState(false);

  return (
    <Box className={classes.container}>
      <Box minHeight="80%">
        <Box display="flex">
          <Typography className={classes.title}>{`Project Title`}</Typography>
          <HelpButton
            text={`Project title helps users understand what the project outcome would be. Good examples are "Build a Web App" and "Publish Research Paper"`}
          />
        </Box>

        <TextField
          variant="outlined"
          margin="normal"
          label={focus ? '' : 'Title of your project'}
          id="title"
          name="title"
          fullWidth
          required
          onFocus={(): void => setFocus(true)}
          onBlur={(): void => setFocus(project.details.title !== null && project.details.title.length > 0)}
          value={project.details.title}
          onChange={handleChange('title')}
        />
      </Box>
    </Box>
  );
};
