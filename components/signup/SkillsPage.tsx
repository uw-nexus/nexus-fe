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
  const [skills, setSkills] = useState(student.skills);
  student.skills = skills;

  return (
    <Box paddingX="1rem">
      <Box paddingX="2rem" marginBottom="4rem">
        <Typography color="textSecondary" align="center" className={classes.text}>
          My skills are HTML, CSS, and UI/UX design. What about you? :)
        </Typography>
      </Box>

      <Typography className={classes.title}>
        <span style={{ fontWeight: 'bold' }}>Skills</span>
        <span style={{ color: '#CACACA' }}> that you would use in your projects</span>
      </Typography>

      <ArrayForm label="Skills and Tools" items={skills} setItems={setSkills} />
    </Box>
  );
};
