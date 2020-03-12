import React, { useState } from 'react';
import { Paper, Grid, Typography, Chip, TextField, Button } from '@material-ui/core';
import useStyles from '../../static/project/style';

export default ({ project, edit }) => {
  const classes = useStyles();

  const [details, setDetails] = useState({...project.details});
  const [skills, setSkills] = useState([...project.skills]);
  const [fields, setFields] = useState([...project.fields]);

  project.details = details;
  project.skills = skills;
  project.fields = fields;

  const handleProjectDesc = async (event) => {
    setDetails({
      ...details,
      description: event.target.value
    });
  }

  const [skillEntry, setSkillEntry] = useState('');
  const [fieldEntry, setFieldEntry] = useState('');

  const handleSkillEntry = async (event) => {
    event.preventDefault();
    setSkills(skills => !skillEntry.length || skills.includes(skillEntry) ? skills : [...skills, skillEntry]);
    setSkillEntry('');
  }

  const handleSkillDelete = skillToDelete => () => {
    setSkills(skills => skills.filter(s => s !== skillToDelete));
  };

  const handleFieldEntry = async (event) => {
    event.preventDefault();
    setFields(fields => !fieldEntry.length || fields.includes(fieldEntry) ? fields : [...fields, fieldEntry]);
    setFieldEntry('');
  }

  const handleFieldDelete = fieldToDelete => () => {
    setFields(fields => fields.filter(f => f !== fieldToDelete));
  };

  return (
    <React.Fragment>
      <Paper className={classes.projectPaper}>
        <Typography component='h2' variant='h6'>Description</Typography>
        <Grid item xs={12}>
          { edit
            ? <TextField
              variant='outlined' size='small'
              id='desc' name='desc' value={details.description}
              fullWidth onChange={handleProjectDesc}
            />
            : details.description || 'N/A'
          }
        </Grid>
      </Paper>

      <Paper className={classes.projectPaper}>
        {edit
          ? <form onSubmit={handleSkillEntry}>
              <Grid container justify='space-between'>
                <Grid item xs={9}>
                  <TextField id='project-skills'
                    placeholder='Skills Required'
                    fullWidth value={skillEntry}
                    onChange={e => setSkillEntry(e.target.value)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button type='submit' variant='contained' color='primary' className={classes.addButton}>+</Button>
                </Grid>
              </Grid>
            </form>
          : <Typography component='h2' variant='h6'>Skills Required</Typography>
        }

        <Grid
          container spacing={1}
          style={{ margin: 0, paddingTop: (skills.length ? '1rem' : 0) }}
          justify={skills.length ? 'flex-start' : 'center'}
          alignItems={skills.length ? 'flex-start' : 'center'}
        >
          {skills.map(s =>
            <Grid item key={s}>
              <Chip label={s} onDelete={edit ? handleSkillDelete(s) : null} color='primary' />
            </Grid>)
          }
        </Grid>
      </Paper>

      <Paper className={classes.projectPaper}>
        {edit
          ? <form onSubmit={handleFieldEntry}>
              <Grid container justify='space-between'>
                <Grid item xs={9}>
                  <TextField id='project-fields'
                    placeholder='Fields Required'
                    fullWidth value={fieldEntry}
                    onChange={e => setFieldEntry(e.target.value)}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button type='submit' variant='contained' color='primary' className={classes.addButton}>+</Button>
                </Grid>
              </Grid>
            </form>
          : <Typography component='h2' variant='h6'>Fields of Interest</Typography>
        }

        <Grid
          container spacing={1}
          style={{ margin: 0, paddingTop: (fields.length ? '1rem' : 0) }}
          justify={fields.length ? 'flex-start' : 'center'}
          alignItems={fields.length ? 'flex-start' : 'center'}
        >
          {fields.map(f =>
            <Grid item key={f}>
              <Chip label={f} onDelete={edit ? handleFieldDelete(f) : null} color='primary' />
            </Grid>)
          }
        </Grid>
      </Paper>
    </React.Fragment>
  );
};
