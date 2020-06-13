import React, { useState, useEffect, useRef } from 'react';
import { Box, TextField, Typography, Select, InputLabel, FormControl } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { FONT } from 'public/static/styles/constants';

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
    fontSize: FONT.GUIDE,
    color: theme.palette.text.secondary,
  },
  title: {
    paddingLeft: theme.spacing(1),
    fontWeight: 'bold',
    color: theme.palette.text.primary,
  },
}));

export default ({ student, handleChange, options }): JSX.Element => {
  const classes = useStyles();

  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <Box className={classes.container}>
      <Box paddingX="1rem" marginTop="1rem" marginBottom="3rem">
        <Typography align="center" className={classes.text}>
          We will match you with the best team and teammates :)
        </Typography>
      </Box>
      <form className={classes.inner}>
        <Typography className={classes.title}>Education</Typography>
        <Autocomplete
          freeSolo={true}
          value={student.school}
          options={options.schools}
          onChange={(_, value): void => handleChange('school', value)}
          renderInput={(params): JSX.Element => (
            <TextField {...params} variant="outlined" margin="normal" label="School" id="school" fullWidth />
          )}
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
            onChange={(e): void => handleChange('degree', e.target.value)}
          >
            <option value="" />
            {options.degrees.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </FormControl>
        <Autocomplete
          freeSolo={true}
          value={student.major1}
          options={options.majors}
          onChange={(_, value): void => handleChange('major1', value)}
          renderInput={(params): JSX.Element => (
            <TextField {...params} variant="outlined" margin="normal" label="Major 1" id="major1" fullWidth />
          )}
        />
        <Autocomplete
          freeSolo={true}
          value={student.major2}
          options={options.majors}
          onChange={(_, value): void => handleChange('major2', value)}
          renderInput={(params): JSX.Element => (
            <TextField {...params} variant="outlined" margin="normal" label="Major 2" id="major2" fullWidth />
          )}
        />
      </form>
    </Box>
  );
};
