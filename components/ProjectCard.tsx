import React from 'react';
import { Avatar, Typography, Link } from '@material-ui/core';
import { Paper, Grid } from '@material-ui/core';

import useStyles from 'public/static/styles/projectlist';
import { formatDateFE } from 'utils';
import { ProjectDetails } from 'types';

export default (project: ProjectDetails): JSX.Element => {
  const classes = useStyles();
  const { projectId, owner, title, startDate, endDate, status } = project;

  return (
    <Link href={`/project/${projectId}`} underline="none">
      <Paper elevation={2}>
        <Grid container className={classes.projectCard}>
          <Grid item xs={3} container justify="center" alignItems="center">
            <Avatar className={classes.projectPic} variant="rounded" alt="Project Picture" src={''} />
          </Grid>
          <Grid item xs={7}>
            <Typography variant="subtitle1">{title}</Typography>
            <Typography variant="subtitle2">{owner ? `${owner.firstName} ${owner.lastName}` : ''}</Typography>
            <Typography variant="caption" color="textSecondary">
              {formatDateFE(startDate)} - {formatDateFE(endDate)}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="caption" color="textSecondary">
              {status}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Link>
  );
};
