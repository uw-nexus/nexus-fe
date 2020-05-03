import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ArrayForm from 'components/ArrayForm';

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: theme.spacing(2.25),
  },
  title: {
    paddingLeft: '.5rem',
  },
}));

export default ({ student }): JSX.Element => {
  const classes = useStyles();
  const [roles, setRoles] = useState(student.roles);
  student.roles = roles;

  return (
    <Box paddingX="1rem">
      <Box marginBottom="4rem">
        <Typography color="textSecondary" align="center" className={classes.text}>
          My role is a product designer but also a UX designer. What about you? :)
        </Typography>
      </Box>

      <Typography className={classes.title}>
        <span style={{ fontWeight: 'bold' }}>Roles</span>
        <span style={{ color: '#CACACA' }}> that you would take in your projects</span>
      </Typography>

      <ArrayForm label="Titles" items={roles} setItems={setRoles} />
    </Box>
  );
};
