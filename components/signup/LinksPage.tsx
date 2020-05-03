import React from 'react';
import { TextField, Typography, Button } from '@material-ui/core';
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
  button: {
    border: '2px solid #F05A28',
    borderRadius: '10px',
    width: '100%',
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    fontSize: theme.spacing(2.5),
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
  },
}));

export default ({ handleChange, saveStudent }): JSX.Element => {
  const classes = useStyles();

  return (
    <Box paddingX="1rem">
      <Box paddingX="1rem" marginBottom="4rem">
        <Typography color="textSecondary" align="center" className={classes.text}>
          I shared my resume and LinkedIn to let people know more about me :)
        </Typography>
      </Box>

      <form onSubmit={saveStudent}>
        <Typography className={classes.title}>Personal Links</Typography>

        <TextField
          variant="outlined"
          margin="normal"
          label="Resume"
          id="resume"
          name="resume"
          fullWidth
          onChange={handleChange('resume')}
        />

        <TextField
          variant="outlined"
          margin="normal"
          label="LinkedIn URL"
          id="linkedin"
          name="linkedin"
          fullWidth
          onChange={handleChange('linkedin')}
        />

        <TextField
          variant="outlined"
          margin="normal"
          label="Personal Website"
          id="website"
          name="website"
          fullWidth
          onChange={handleChange('website')}
        />

        <Box marginX="calc(20% - 1rem)" width="60%" position="absolute" bottom="15%">
          <Button type="submit" aria-label="Complete" size="large" className={classes.button}>
            Complete
          </Button>
        </Box>
      </form>
    </Box>
  );
};
