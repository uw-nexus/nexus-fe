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
    fontWeight: 'bold',
  },
}));

export default ({ profile }): JSX.Element => {
  const classes = useStyles();
  const [interests, setInterests] = useState(profile.interests);
  profile.interests = interests;

  return (
    <Box paddingX="1rem">
      <Box paddingX="1rem" marginBottom="4rem">
        <Typography color="textSecondary" align="center" className={classes.text}>
          I am interested in healthcare and cloud computing. What about you? :)
        </Typography>
      </Box>

      <Typography className={classes.title}>Areas of Interest</Typography>
      <ArrayForm label="Project Topics" items={interests} setItems={setInterests} />
    </Box>
  );
};
