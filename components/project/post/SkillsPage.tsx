import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ArrayForm from 'components/ArrayForm';
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
    color: theme.palette.text.primary,
  },
}));

export default ({ project }): JSX.Element => {
  const classes = useStyles();
  const [skills, setSkills] = useState(project.skills);
  project.skills = skills;

  return (
    <Box className={classes.container}>
      <Box paddingX="1rem" marginTop="1rem" marginBottom="3rem">
        <Typography align="center" className={classes.text}>
          {`I was looking for the UX designers who know how to make wireframes, conduct user testings, and use figma.`}
        </Typography>
      </Box>
      <Box minHeight="80%">
        <Typography className={classes.title}>
          <span style={{ fontWeight: 'bold' }}>{`Skills / Tools`}</span>
        </Typography>
        <ArrayForm label="Skills" items={skills} setItems={setSkills} />
      </Box>
    </Box>
  );
};
