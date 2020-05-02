import React, { useState, useEffect, useRef } from 'react';
import { TextField, Typography, Select, InputLabel, FormControl } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  text: {
    fontSize: theme.spacing(2.25),
  },
  title: {
    paddingLeft: '.5rem',
    fontWeight: 'bold',
  },
}));

export default ({ profile, handleChange }): JSX.Element => {
  const classes = useStyles();
  const standingChoices = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'];

  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  return (
    <Box paddingX="1rem">
      <Box paddingX="3rem" marginBottom="4rem">
        <Typography color="textSecondary" align="center" className={classes.text}>
          We will match you with the best team and teammates :)
        </Typography>
      </Box>

      <form>
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
          <InputLabel ref={inputLabel} htmlFor="standing">
            Standing
          </InputLabel>
          <Select
            native
            value={profile.standing}
            labelWidth={labelWidth}
            inputProps={{ name: 'standing', id: 'standing' }}
            onChange={handleChange('standing')}
          >
            <option value="" />
            {standingChoices.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </FormControl>

        <TextField
          variant="outlined"
          margin="normal"
          label="Major 2"
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
