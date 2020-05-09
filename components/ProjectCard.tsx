import React from 'react';
import { Typography, Link, Chip, IconButton } from '@material-ui/core';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Project } from 'types';

import { COLORS, FONT } from 'public/static/styles/constants';

const useStyles = makeStyles((theme) => ({
  card: {
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.12)',
    borderRadius: '15px',
    marginTop: theme.spacing(7.5),
    marginBottom: theme.spacing(7.5),
    padding: theme.spacing(4),
  },

  cardHeader: {
    marginBottom: theme.spacing(4),
  },
  status: {
    color: COLORS.GRAY_C4,
    fontSize: FONT.MISC,
  },
  title: {
    color: COLORS.BLACK,
    fontSize: FONT.HEADING,
  },
  saveBtn: {
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.12)',
    width: '48px',
    height: '48px',
    borderRadius: '48px',
  },

  interests: {
    color: COLORS.GRAY_C4,
  },

  roles: {
    color: COLORS.GRAY_75,
    fontSize: '1rem',
  },
  rolesName: {
    color: theme.palette.primary.main,
  },
  rolesCount: {
    fontSize: '.875rem',
  },

  skillsContainer: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  skillsItem: {
    backgroundColor: COLORS.BG_GRAY,
    borderRadius: '5px',
    color: COLORS.GRAY_75,
    fontSize: '.875rem',
  },

  detailsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginTop: theme.spacing(3),
    paddingRight: theme.spacing(10),
  },
  detailsItem: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  detailsIcon: {
    float: 'left',
    marginRight: theme.spacing(1.5),
  },
  detailsText: {
    color: COLORS.GRAY_75,
    fontSize: FONT.MISC,
  },
}));

export default ({ details, roles, skills, interests }: Project): JSX.Element => {
  const classes = useStyles();
  const { projectId, title, status, duration, size, postal } = details;
  roles = ['role1', 'role2', 'role3'];

  return (
    <Box className={classes.card}>
      <Box className={classes.cardHeader}>
        <Grid container>
          <Grid item xs={10}>
            <Typography className={classes.status}>{status}</Typography>
            <Link href={`/project/${projectId}`} underline="none">
              <Typography className={classes.title}>{title}</Typography>
            </Link>
            <Typography variant="body2" className={classes.interests}>
              {interests.join(', ')}
            </Typography>
          </Grid>
          <Grid item xs={2} style={{ textAlign: 'right' }}>
            <IconButton className={classes.saveBtn}>
              <img src="/static/assets/save.svg" alt="save for later" />
            </IconButton>
          </Grid>
        </Grid>
      </Box>

      <Typography variant="body1" className={classes.roles}>
        {'Looking for '}
        <span className={classes.rolesName}>{roles[0] || 'any roles'}</span>
        <span className={classes.rolesCount}>{roles.length > 1 ? ` +${roles.length - 1}` : ''}</span>
      </Typography>

      {skills.length ? (
        <Box className={classes.skillsContainer}>
          <Grid container spacing={3} justify="flex-start" alignItems="flex-start">
            {skills.map((s) => (
              <Grid item key={s}>
                <Chip label={s} className={classes.skillsItem} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : null}

      <Box className={classes.detailsContainer}>
        <Box className={classes.detailsItem}>
          <img
            className={classes.detailsIcon}
            style={{ marginBottom: '1px' }}
            src="/static/assets/duration.svg"
            alt="duration"
          />
          <Typography className={classes.detailsText}>{duration}</Typography>
        </Box>
        <Box className={classes.detailsItem}>
          <img className={classes.detailsIcon} src="/static/assets/team_size.svg" alt="team size" />
          <Typography className={classes.detailsText}>{size}</Typography>
        </Box>
        <Box className={classes.detailsItem}>
          <img className={classes.detailsIcon} src="/static/assets/postal.svg" alt="postal" />
          <Typography className={classes.detailsText}>{postal}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
