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
  const [roles, setRoles] = useState(project.roles);
  project.roles = roles;

  return (
    <Box className={classes.container}>
      <Box paddingX="1rem" marginTop="1rem" marginBottom="3rem">
        <Typography align="center" className={classes.text}>
          {`I was looking for UX designers, UX researchers, full-stack developers, and market analysts for my project.`}
        </Typography>
      </Box>
      <Box minHeight="80%">
        <Typography className={classes.title}>
          <span style={{ fontWeight: 'bold' }}>{`Roles`}</span>
        </Typography>
        <ArrayForm label="Roles" items={roles} setItems={setRoles} options={roles} />
      </Box>
    </Box>
  );
};
