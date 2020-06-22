import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import HelpButton from 'components/HelpButton';
import ArrayForm from 'components/ArrayForm';
import { COLORS } from 'public/static/styles/constants';

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

export default ({ project, handleChange, options }): JSX.Element => {
  const classes = useStyles();
  const [interests, setInterests] = useState(project.interests);

  return (
    <Box className={classes.container}>
      <Box minHeight="80%">
        <Box display="flex">
          <Typography className={classes.title}>
            <span style={{ marginRight: '.5rem' }}>{`Areas of Interest`}</span>
            <span style={{ color: COLORS.GRAY_BB, fontWeight: 'normal' }}>{` (max 5)`}</span>
          </Typography>
          <HelpButton
            text={`This helps users understand the field of studies where your project could fall under. Good examples are 'healthcare', 'AI', 'politics', and 'international studies'.`}
          />
        </Box>
        <ArrayForm
          label="Interests"
          items={interests}
          setItems={(items): void => {
            setInterests(items);
            handleChange('interests', items);
          }}
          limit={5}
          options={options}
        />
      </Box>
    </Box>
  );
};
