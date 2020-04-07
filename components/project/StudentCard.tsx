import React from 'react';
import { Link, IconButton } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { CheckCircle, Cancel } from '@material-ui/icons';

import useStyles from 'public/static/styles/project';

export default ({ student, acceptRequest, declineRequest }): JSX.Element => {
  const classes = useStyles();
  const {
    firstName,
    lastName,
    user: { username },
  } = student;

  return (
    <Grid item xs={12} container justify="space-evenly" alignItems="center" className={classes.memberEntry}>
      <Grid item xs={7}>
        <Link href={`/user/${username}`} color="inherit" style={{ fontWeight: 'bold', paddingLeft: '1rem' }}>
          {firstName} {lastName}
        </Link>
      </Grid>
      <Grid item xs={4} container justify="space-around">
        {acceptRequest ? (
          <IconButton aria-label="Accept" onClick={acceptRequest} style={{ padding: '.5rem' }}>
            <CheckCircle />
          </IconButton>
        ) : null}
        <IconButton aria-label="Decline" onClick={declineRequest} style={{ padding: '.5rem' }}>
          <Cancel />
        </IconButton>
      </Grid>
    </Grid>
  );
};
