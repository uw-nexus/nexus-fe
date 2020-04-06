import React, { useState } from 'react';
import { Paper, Grid, Typography, TextField } from '@material-ui/core';

import ArrayForm from '../ArrayForm';
import useStyles from '../../public/static/styles/project';

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

  return (
    <>
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
        <Typography component='h2' variant='h6'>Skills Required</Typography>
        <ArrayForm label='Skill' items={skills} setItems={setSkills} allowEdit={edit} />
      </Paper>

      <Paper className={classes.projectPaper}>
        <Typography component='h2' variant='h6'>Fields of Interest</Typography>
        <ArrayForm label='Field' items={fields} setItems={setFields} allowEdit={edit} />
      </Paper>
    </>
  );
};
