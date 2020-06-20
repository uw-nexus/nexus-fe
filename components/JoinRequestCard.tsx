import React from 'react';
import { Typography, Link, IconButton } from '@material-ui/core';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { COLORS, FONT } from 'public/static/styles/constants';
import { BE_ADDR } from 'utils';

const useStyles = makeStyles((theme) => ({
  card: {
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.12)',
    borderRadius: '15px',
    marginTop: theme.spacing(7.5),
    marginBottom: theme.spacing(7.5),
    padding: theme.spacing(4),
    '&:hover': {
      boxShadow: '0px 12px 48px rgba(0, 0, 0, 0.18)',
    },
  },

  cardHeader: {
    marginBottom: theme.spacing(4),
  },
  name: {
    color: COLORS.BLACK,
    fontSize: FONT.HEADING,
  },

  roles: {
    fontSize: '1rem',
  },
  rolesCount: {
    fontSize: '.875rem',
  },

  projects: {
    color: COLORS.GRAY_75,
  },

  detailsIcon: {
    float: 'left',
    marginRight: theme.spacing(2),
  },
}));

export default ({ contractId, student, project, onDelete }): JSX.Element => {
  const classes = useStyles();

  const handleDelete = async (event): Promise<void> => {
    event.preventDefault();
    const res = await fetch(`${BE_ADDR}/contracts/${contractId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ status: 'Removed' }),
    });

    if (res.ok) onDelete();
  };

  return (
    <Box className={classes.card}>
      <Box className={classes.cardHeader}>
        <Grid container>
          <Grid item xs={10}>
            <Link href={`/student/${student.username}`} underline="none">
              <Typography className={classes.name}>
                {student.firstName} {student.lastName}
              </Typography>
            </Link>

            <Typography variant="body1" className={classes.roles}>
              {student.roles[0] || ''}
              <span className={classes.rolesCount}>
                {student.roles.length > 1 ? ` +${student.roles.length - 1}` : ''}
              </span>
            </Typography>

            <Typography variant="body2" className={classes.projects}>
              {`Wants to join `}
              <span style={{ color: COLORS.PRIMARY }}>{project}</span>
              {`.`}
            </Typography>
          </Grid>

          <Grid item xs={2} style={{ textAlign: 'right' }}>
            <IconButton onClick={handleDelete} style={{ padding: 0 }}>
              <img src={`/static/assets/close.svg`} alt="remove" />
            </IconButton>
          </Grid>
        </Grid>
      </Box>

      <Box display="flex" alignItems="center">
        <img className={classes.detailsIcon} src="/static/assets/email.svg" alt="email" />
        <Typography>{student.email}</Typography>
      </Box>
    </Box>
  );
};
