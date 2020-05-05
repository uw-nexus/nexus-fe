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
  inner: {
    minHeight: '80%',
  },
  text: {
    fontSize: theme.spacing(4.5),
  },
  title: {
    paddingLeft: theme.spacing(1),
    fontWeight: 'bold',
  },
}));

export default ({ student }): JSX.Element => {
  const classes = useStyles();
  const [interests, setInterests] = useState(student.interests);
  student.interests = interests;

  return (
    <Box className={classes.container}>
      <Box paddingX="1rem" marginTop="1rem" marginBottom="3rem">
        <Typography color="textSecondary" align="center" className={classes.text}>
          I am interested in healthcare and cloud computing. What about you? :)
        </Typography>
      </Box>
      <Box className={classes.inner}>
        <Typography className={classes.title}>Areas of Interest</Typography>
        <ArrayForm label="Project Topics" items={interests} setItems={setInterests} />
      </Box>
    </Box>
  );
};
