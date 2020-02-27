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

const majorChoices = [
  'Informatics',
  'Computer Science',
  'Human Centered Design & Engineering',
  'Business Administration'
];

export default ({ student }) => {
  const [profile, setProfile] = useState(student.profile);
  const [editData, setEditData] = useState(false);

  const handleChange = (name) => (event) => {
    setProfile({
      ...profile,
      [name]: event.target.value
    });
  };

  const toggle = async () => {
    if (editData) {
      try {
        profile.dob = new Date(profile.dob).toISOString().split('T')[0];
      } catch {
        profile.dob = '';
      }
      
      await fetch(`${process.env.BE_ADDR}/students`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          student: {
            profile: {
              dob: profile.dob,
              school: profile.school,
              standing: profile.standing,
              major1: profile.major1,
              major2: profile.major2
            }
          }
        })
      });
    }

    setEditData(!editData);
  };

  const formatDateForDisplay = (dateStr) => new Date(dateStr).toLocaleString().split(',')[0];

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
                  label='MM/DD/YYYY' value={formatDateForDisplay(profile.dob)}
                  fullWidth onChange={handleChange('dob')}
                />
              : (profile.dob ? formatDateForDisplay(profile.dob) : 'N/A')
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
              : profile.school || 'N/A'
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
              : profile.standing || 'N/A'
          }
        </Grid>

        <Grid item xs={6}>
          <h4 style={{ margin: 0, marginBottom: '.5rem', opacity: '50%' }}>MAJOR 1</h4>
          { editData
              ? <FormControl variant='outlined' size='small' fullWidth>
                  <Select
                    native value={profile.major1}
                    inputProps={{ name: 'major1', id: 'major1' }}
                    onChange={handleChange('major1')}
                  >
                    <option value='' />
                    {majorChoices.map(s => <option key={s} value={s}>{s}</option>)}
                  </Select>
                </FormControl>
              : profile.major1 || 'N/A'
          }
        </Grid>

        <Grid item xs={6}>
          <h4 style={{ margin: 0, marginBottom: '.5rem', opacity: '50%' }}>MAJOR 2</h4>
          { editData
              ? <FormControl variant='outlined' size='small' fullWidth>
                  <Select
                    native value={profile.major2}
                    inputProps={{ name: 'major2', id: 'major2' }}
                    onChange={handleChange('major2')}
                  >
                    <option value='' />
                    {majorChoices.map(s => <option key={s} value={s}>{s}</option>)}
                  </Select>
                </FormControl>
              : profile.major2 || 'N/A'
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