import React from 'react';
import { TextField, Typography, Button } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { vh } from 'utils';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: theme.spacing(4),
    paddingBottom: 0,
  },
  inner: {
    minHeight: '80%',
    paddingBottom: vh(7),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: theme.spacing(4.5),
  },
  title: {
    paddingLeft: theme.spacing(1),
    fontWeight: 'bold',
  },
  button: {
    border: '2px solid #F05A28',
    borderRadius: '10px',
    width: '100%',
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    fontSize: theme.spacing(5),
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
  },
}));

export default ({ handleChange, saveStudent }): JSX.Element => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box paddingX="1rem" marginTop="1rem" marginBottom="3rem">
        <Typography color="textSecondary" align="center" className={classes.text}>
          I shared my resume and LinkedIn to let people know more about me :)
        </Typography>
      </Box>
      <form onSubmit={saveStudent} className={classes.inner}>
        <Box>
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
        </Box>
        <Box width="100%" paddingX="20%">
          <Button type="submit" aria-label="Complete" size="large" className={classes.button}>
            Complete
          </Button>
        </Box>
      </form>
    </Box>
  );
};
