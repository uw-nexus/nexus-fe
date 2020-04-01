import React, { useState } from 'react';
import { Box, Button } from '@material-ui/core';
import fetch from 'isomorphic-unfetch';

import ArrayForm from '../ArrayForm';

export default ({ student }) => {
  student.skills.sort();
  const [skills, setSkills] = useState([...student.skills]);
  const [edit, setEdit] = useState(false);
  student.skills = skills;

  const toggle = async () => {
    if (edit) {
      await fetch(`${process.env.BE_ADDR}/students`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ skills })
      });
    }

    setEdit(!edit);
  };

  return (
    <>
      <ArrayForm label='Skill' items={skills} setItems={setSkills} allowEdit={edit} />
      <Box textAlign='center' marginTop='3rem'>
        <Button variant='contained' color='primary' onClick={toggle}>
          {edit ? 'SAVE' : 'EDIT'}
        </Button>
      </Box>
    </>
  );
};