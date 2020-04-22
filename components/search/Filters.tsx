import React from 'react';
import { Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ArrayForm from '../ArrayForm';

const useStyles = makeStyles(() => ({
  divider: {
    marginTop: '1rem',
    marginBottom: '.5rem',
  },
}));

export default ({ skills, setSkills, interests, setInterests }): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      <Divider variant="middle" className={classes.divider} />
      <ArrayForm label="Skill" items={skills} setItems={setSkills} />
      <ArrayForm label="Field" items={interests} setItems={setInterests} />
    </>
  );
};
