import React, { useState } from 'react';
import { Typography, Link, Chip, IconButton } from '@material-ui/core';
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
    maxHeight: theme.spacing(8),
    overflowY: 'hidden',
  },
  skillsItem: {
    backgroundColor: COLORS.BG_GRAY,
    borderRadius: '5px',
    color: COLORS.GRAY_75,
    fontSize: '.875rem',
  },

  detailsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing(3),
    paddingRight: theme.spacing(5),
  },
  detailsItem: {
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginRight: '8%',
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

export default ({ details, roles, skills, interests, saved }): JSX.Element => {
  const classes = useStyles();
  const [saveStatus, setSaveStatus] = useState(saved);

  const interestsText = interests.join(', ');

  const handleToggleSave = async (event): Promise<void> => {
    event.preventDefault();
    const res = await fetch(`${BE_ADDR}/saved/projects/${details.projectId}`, {
      method: saveStatus ? 'DELETE' : 'POST',
      credentials: 'include',
    });

    if (res.ok) setSaveStatus(!saveStatus);
  };

  return (
    <Link href={`/project/${details.projectId}`} underline="none">
      <Box className={classes.card}>
        <Box className={classes.cardHeader}>
          <Grid container>
            <Grid item xs={10}>
              <Typography className={classes.status}>{details.status}</Typography>
              <Typography className={classes.title}>
                {details.title.substring(0, 18)}
                {details.title.length > 18 ? '...' : ''}
              </Typography>
              <Typography variant="body2" className={classes.interests}>
                {interestsText.substring(0, 36)}
                {interestsText.length > 36 ? '...' : ''}
              </Typography>
            </Grid>
            <Grid item xs={2} style={{ textAlign: 'right' }}>
              <IconButton className={classes.saveBtn} onClick={handleToggleSave}>
                <img src={`/static/assets/${saveStatus ? 'saved.svg' : 'not_saved.svg'}`} alt="toggle save" />
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
            <Grid container spacing={3} justify="flex-start" alignItems="flex-start" style={{ width: '100%' }}>
              {skills.map((s) => (
                <Grid item key={s}>
                  <Chip label={s} className={classes.skillsItem} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : null}

        <Box className={classes.detailsContainer}>
          <Box className={classes.detailsItem} display={`${details.duration ? 'flex' : 'none'}`}>
            <img
              className={classes.detailsIcon}
              style={{ marginBottom: '1px' }}
              src="/static/assets/duration.svg"
              alt="duration"
            />
            <Typography className={classes.detailsText}>{details.duration}</Typography>
          </Box>

          <Box className={classes.detailsItem} display={`${details.size ? 'flex' : 'none'}`}>
            <img className={classes.detailsIcon} src="/static/assets/team_size.svg" alt="team size" />
            <Typography className={classes.detailsText}>{details.size}</Typography>
          </Box>

          <Box className={classes.detailsItem} display={`${details.postal ? 'flex' : 'none'}`}>
            <img className={classes.detailsIcon} src="/static/assets/postal.svg" alt="postal" />
            <Typography className={classes.detailsText}>{details.postal}</Typography>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};
