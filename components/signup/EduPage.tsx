import React, { useState, useEffect, useRef } from 'react';
import { TextField, Typography, Select, InputLabel, FormControl } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
    fontSize: theme.spacing(4.5),
  },
  title: {
    paddingLeft: theme.spacing(1),
    fontWeight: 'bold',
  },
}));

export default ({ student, handleChange }): JSX.Element => {
  const classes = useStyles();
  const degreeChoices = [
    'Certificate Programa',
    'GED',
    'High School',
    `Associate's`,
    `Bachelor's`,
    `Master's`,
    'Doctoral',
  ];

  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <Box className={classes.container}>
      <Box paddingX="1rem" marginTop="1rem" marginBottom="3rem">
        <Typography color="textSecondary" align="center" className={classes.text}>
          We will match you with the best team and teammates :)
        </Typography>
      </Box>
      <form className={classes.inner}>
        <Typography className={classes.title}>Education</Typography>
        <TextField
          variant="outlined"
          margin="normal"
          label="School"
          id="school"
          name="school"
          fullWidth
          onChange={handleChange('school')}
        />
        <FormControl variant="outlined" margin="normal" fullWidth>
          <InputLabel ref={inputLabel} htmlFor="degree">
            Degree
          </InputLabel>
          <Select
            native
            value={student.degree}
            labelWidth={labelWidth}
            inputProps={{ name: 'degree', id: 'degree' }}
            onChange={handleChange('degree')}
          >
            <option value="" />
            {degreeChoices.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </FormControl>
        <TextField
          variant="outlined"
          margin="normal"
          label="Major 1"
          id="major1"
          name="major1"
          fullWidth
          onChange={handleChange('major1')}
        />
        <TextField
          variant="outlined"
          margin="normal"
          label="Major 2"
          id="major2"
          name="major2"
          fullWidth
          onChange={handleChange('major2')}
        />
      </form>
    </Box>
  );
};
