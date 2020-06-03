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
  inner: {
    minHeight: '80%',
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

export default ({ student }): JSX.Element => {
  const classes = useStyles();
  const [skills, setSkills] = useState(student.skills);
  student.skills = skills;

  return (
    <Box className={classes.container}>
      <Box paddingX="1rem" marginTop="1rem" marginBottom="3rem">
        <Typography align="center" className={classes.text}>
          My skills are HTML, CSS, and UI/UX design. What about you? :)
        </Typography>
      </Box>
      <Box className={classes.inner}>
        <Typography className={classes.title}>
          <span style={{ fontWeight: 'bold' }}>Skills</span>
          <span style={{ color: COLORS.GRAY_BB }}> that you would use in your projects</span>
        </Typography>
        <ArrayForm label="Skills and Tools" items={skills} setItems={setSkills} options={skills} />
      </Box>
    </Box>
  );
};
