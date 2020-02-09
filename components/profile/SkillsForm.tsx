import React, { useState } from 'react';
import { Chip, Button, TextField } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import fetch from 'isomorphic-unfetch';

import useStyles from '../../static/profile/style';

export default ({ student }) => {
  const classes = useStyles();

  student.skills.sort();
  const [skills, setSkills] = useState([...student.skills]);
  const [skillEntry, setSkillEntry] = useState('');
  const [editSkills, setEditSkills] = useState(false);
  student.skills = skills;

  const handleSkillEntry = async (event) => {
    event.preventDefault();
    setSkills(skills => !skillEntry.length || skills.includes(skillEntry) ? skills : [...skills, skillEntry]);
    setSkillEntry('');
  }

  const handleSkillDelete = (skillToDelete) => () => {
    setSkills(skills => skills.filter(s => s !== skillToDelete));
  };

  const toggle = async () => {
    if (editSkills) {
      await fetch('http://localhost:3100/students', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ student: { skills } })
      });
    }

    setEditSkills(!editSkills);
  };

  return (
    <React.Fragment>
      <form className={classes.form} noValidate onSubmit={handleSkillEntry}>
        <Grid container spacing={2} style={{ marginTop: '0.5rem', marginBottom: '4rem' }}>
          <Grid container item
            xs={12} spacing={1} 
            justify={skills.length ? 'flex-start' : 'center'}
            alignItems={skills.length ? 'flex-start' : 'center'}
            style={{ marginBottom: editSkills ? '2rem' : 0 }}
            >
            {skills.length ? null : <p style={{ color: 'grey' }}>No skills entered</p>}
            {skills.map(s => 
              <Grid item key={s}>
                <Chip label={s} onDelete={editSkills ? handleSkillDelete(s) : null} color='primary' />
              </Grid>)}
          </Grid>

          { editSkills
              ? <React.Fragment>
                  <Grid item xs={10}>
                    <TextField
                      id='skill-entry' name='skill-entry'
                      variant='outlined' label='Skill'
                      size='small' value={skillEntry}
                      fullWidth
                      onChange={e => setSkillEntry(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={2}>
                    <Button type='submit' variant='contained' color='primary' className={classes.addButton}>+</Button>
                  </Grid>
                </React.Fragment>
              : null
          }
        </Grid>
      </form>

      <Button variant='contained' color='primary' onClick={toggle}>
        {editSkills ? 'SAVE' : 'EDIT'}
      </Button>
    </React.Fragment>
  );
};