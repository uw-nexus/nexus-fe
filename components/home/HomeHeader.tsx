import React from 'react';
import { Box, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SideNav from 'components/SideNav';
import { COLORS, FONT } from 'public/static/styles/constants';

enum MODE {
  Projects = 'projects',
  Recruitment = 'students',
}

const useStyles = makeStyles((theme) => ({
  btn: {
    color: COLORS.GRAY_C4,
    fontWeight: 'bold',
    fontSize: FONT.LABEL,
    '&:hover': {
      color: theme.palette.primary.light,
      backgroundColor: 'transparent',
    },
  },
  highlight: {
    color: theme.palette.primary.main,
  },
}));

export default ({ mode, setMode, authenticated }): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={2}>
        <SideNav iconStyle={{ padding: 0, marginLeft: '.5rem' }} authenticated={authenticated} />
      </Grid>
      <Grid item xs={8}>
        <Box display="flex" justifyContent="space-evenly" alignItems="center" height="100%">
          <Button
            disableRipple
            aria-label="Projects"
            className={`${classes.btn} ${mode === MODE.Projects ? classes.highlight : ''}`}
            onClick={(): void => setMode(MODE.Projects)}
          >
            Projects
          </Button>
          <Button
            disableRipple
            aria-label="Recruitment"
            className={`${classes.btn} ${mode === MODE.Recruitment ? classes.highlight : ''}`}
            onClick={(): void => setMode(MODE.Recruitment)}
          >
            Recruitment
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
