import React, { useState } from 'react';
import { Button, TextField, FormControl, Select } from "@material-ui/core";
import { Box, Grid } from '@material-ui/core';
import fetch from 'isomorphic-unfetch';

const standingChoices = [
  'Freshman',
  'Sophomore',
  'Junior',
  'Senior',
  'Graduate'
];

const schoolChoices = [
  'University of Washington'
];

export default ({ student }) => {
  const [profile, setProfile] = useState(student.profile);
  const [editData, setEditData] = useState(false);

  const toggle = async () => {
    if (editData) {
      try {
        profile.dob = new Date(profile.dob).toISOString().split('T')[0];
      } catch {
        profile.dob = '';
      }

      console.log(profile)
      
      await fetch('http://localhost:3100/students', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          student: {
            profile: {
              dob: profile.dob,
              school: profile.school,
              standing: profile.standing
            }
          }
        })
      });
    }

    setEditData(!editData);
  };

  const handleChange = (name) => (event) => {
    setProfile({
      ...profile,
      [name]: event.target.value
    });
  };

  return (
    <React.Fragment>
      <Grid container spacing={3} justify='center' style={{ marginBottom: '2rem' }}>
        <Grid item xs={12}>
          <h4 style={{ margin: 0, marginBottom: '.5rem', opacity: '50%' }}>EMAIL</h4>
          { profile.email }
        </Grid>

        <Grid item xs={12}>
          <h4 style={{ margin: 0, marginBottom: '.5rem', opacity: '50%' }}>DATE OF BIRTH</h4>
          { editData
              ? <TextField
                  variant='outlined' size='small' 
                  id='dob' name='dob'
                  label='Date of Birth (MM/DD/YYYY)'
                  fullWidth onChange={handleChange('dob')}
                />
              : new Date(profile.dob).toLocaleString().split(',')[0]
          }
        </Grid>

        <Grid item xs={12}>
          <h4 style={{ margin: 0, marginBottom: '.5rem', opacity: '50%' }}>SCHOOL</h4>
          { editData
              ? <FormControl variant='outlined' size='small' fullWidth>
                  <Select
                    native value={profile.school}
                    inputProps={{ name: 'school', id: 'school' }}
                    onChange={handleChange('school')}
                  >
                    <option value='' />
                    {schoolChoices.map(s => <option key={s} value={s}>{s}</option>)}
                  </Select>
                </FormControl>
              : profile.school
          }
        </Grid>

        <Grid item xs={12}>
          <h4 style={{ margin: 0, marginBottom: '.5rem', opacity: '50%' }}>STANDING</h4>
          { editData
              ? <FormControl variant='outlined' size='small' fullWidth>
                  <Select
                    native value={profile.standing}
                    inputProps={{ name: 'standing', id: 'standing' }}
                    onChange={handleChange('standing')}
                  >
                    <option value='' />
                    {standingChoices.map(s => <option key={s} value={s}>{s}</option>)}
                  </Select>
                </FormControl>
              : profile.standing
          }
        </Grid>
      </Grid>

      <Box textAlign='center'>
        <Button variant='contained' color='primary' onClick={toggle}>
          {editData ? 'SAVE' : 'EDIT'}
        </Button>
      </Box>
    </React.Fragment>
  );
};