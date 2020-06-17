import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ArrayForm from 'components/ArrayForm';

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

export default ({ project, roleOpts, skillOpts }): JSX.Element => {
  const classes = useStyles();
  const [roles, setRoles] = useState(project.roles);
  const [skills, setSkills] = useState(project.skills);
  project.roles = roles;
  project.skills = skills;

  return (
    <Box className={classes.container}>
      <Box minHeight="80%">
        <Box marginBottom="2.5rem">
          <Typography className={classes.title}>{`Roles`}</Typography>
          <ArrayForm label="Roles you are looking for" items={roles} setItems={setRoles} options={roleOpts} />
        </Box>

        <Box marginBottom="2.5rem">
          <Typography className={classes.title}>{`Skills / Tools`}</Typography>
          <ArrayForm label="Preferred skills" items={skills} setItems={setSkills} options={skillOpts} />
        </Box>
      </Box>
    </Box>
  );
};
