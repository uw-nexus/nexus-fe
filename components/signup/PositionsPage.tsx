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

export default ({ profile }): JSX.Element => {
  const classes = useStyles();
  const [positions, setPositions] = useState(profile.positions);
  profile.positions = positions;

  return (
    <Box paddingX="1rem">
      <Box marginBottom="4rem">
        <Typography color="textSecondary" align="center" className={classes.text}>
          My position is a product designer but also a UX designer. What about you? :)
        </Typography>
      </Box>

      <Typography className={classes.title}>
        <span style={{ fontWeight: 'bold' }}>Positions</span>
        <span style={{ color: '#CACACA' }}> that you be use in your projects</span>
      </Typography>

      <ArrayForm label="Titles" items={positions} setItems={setPositions} />
    </Box>
  );
};
