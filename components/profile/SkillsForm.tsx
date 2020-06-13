import React, { useState } from 'react';
import { Box, Button } from '@material-ui/core';
import fetch from 'isomorphic-unfetch';

import ArrayForm from '../ArrayForm';
import { BE_ADDR } from 'utils';

export default ({ student }): JSX.Element => {
  student.skills.sort();
  const [skills, setSkills] = useState([...student.skills]);
  const [edit, setEdit] = useState(false);
  student.skills = skills;

  const toggle = async (): Promise<void> => {
    if (edit) {
      await fetch(`${BE_ADDR}/students`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ skills }),
      });
    }

    setEdit(!edit);
  };

  return (
    <>
      <ArrayForm label="Skill" items={skills} setItems={setSkills} allowEdit={edit} options={student.skills} />
      <Box textAlign="center" marginTop="3rem">
        <Button aria-label="Toggle Action" variant="contained" color="primary" onClick={toggle}>
          {edit ? 'SAVE' : 'EDIT'}
        </Button>
      </Box>
    </>
  );
};
