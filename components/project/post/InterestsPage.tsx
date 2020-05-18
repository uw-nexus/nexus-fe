import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ArrayForm from 'components/ArrayForm';
import { FONT, COLORS } from 'public/static/styles/constants';

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
  const [interests, setInterests] = useState(project.interests);
  project.interests = interests;

  return (
    <Box className={classes.container}>
      <Box paddingX="1rem" marginTop="1rem" marginBottom="3rem">
        <Typography align="center" className={classes.text}>
          {`My project categories belonged to ‘healthcare’, and ‘IT’ as we built a web that provides health information.`}
        </Typography>
      </Box>
      <Box minHeight="80%">
        <Typography className={classes.title}>
          <span style={{ fontWeight: 'bold' }}>{`Areas of Interest`}</span>
          <span style={{ color: COLORS.GRAY_BB }}>{` (max 5)`}</span>
        </Typography>
        <ArrayForm label="Interests" items={interests} setItems={setInterests} limit={5} />
      </Box>
    </Box>
  );
};
