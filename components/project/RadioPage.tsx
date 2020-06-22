import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RadioForm from 'components/RadioForm';
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

export default ({ project, teamSizeOpts, durationOpts, projectTypeOpts }): JSX.Element => {
  const classes = useStyles();

  const [size, setSize] = useState(project.details.size);
  const [duration, setDuration] = useState(project.details.duration);
  const [type, setType] = useState(project.details.status);
  project.details.size = size;
  project.details.duration = duration;
  project.details.status = type;

  return (
    <Box className={classes.container}>
      <Box minHeight="80%">
        <Box marginBottom="2.5rem">
          <Typography className={classes.title}>{`Team Size`}</Typography>
          <RadioForm value={size} setValue={setSize} options={teamSizeOpts} />
        </Box>

        <Box marginBottom="2.5rem">
          <Typography className={classes.title}>{`Project Duration`}</Typography>
          <RadioForm value={duration} setValue={setDuration} options={durationOpts} />
        </Box>

        <Box marginBottom="2.5rem">
          <Box display="flex">
            <Typography className={classes.title}>{`Type of Project`}</Typography>
            <HelpButton
              text={`A new project is the one that starts from scratch, while an ongoing means the project is continuing.`}
            />
          </Box>
          <RadioForm value={type} setValue={setType} options={projectTypeOpts} />
        </Box>
      </Box>
    </Box>
  );
};
