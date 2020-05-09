import React from 'react';
import { Typography, Link, Chip, IconButton } from '@material-ui/core';
import { Box, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Student } from 'types';

import { COLORS, FONT } from 'public/static/styles/constants';

const useStyles = makeStyles((theme) => ({
  card: {
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.12)',
    borderRadius: '15px',
    marginTop: theme.spacing(3.75),
    marginBottom: theme.spacing(3.75),
    padding: theme.spacing(4),
  },

  cardHeader: {
    marginBottom: theme.spacing(4),
  },
  status: {
    color: COLORS.GRAY_C4,
    fontSize: FONT.MISC,
  },
  name: {
    color: COLORS.BLACK,
    fontSize: FONT.HEADING,
  },
  saveBtn: {
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.12)',
    width: '48px',
    height: '48px',
    borderRadius: '48px',
  },

  roles: {
    color: COLORS.GRAY_75,
    fontSize: '1rem',
  },
  rolesCount: {
    fontSize: '.875rem',
  },

  interests: {
    color: COLORS.GRAY_C4,
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

export default ({ profile, roles, skills, interests }: Student): JSX.Element => {
  const classes = useStyles();
  const {
    user: { username },
    firstName,
    lastName,
    degree,
    major1,
    major2,
    postal,
  } = profile;
  roles = ['role1', 'role2', 'role3'];

  return (
    <Box className={classes.card}>
      <Box className={classes.cardHeader}>
        <Grid container>
          <Grid item xs={10}>
            <Link href={`/student/${username}`} underline="none">
              <Typography className={classes.name}>
                {firstName} {lastName}
              </Typography>
            </Link>
            <Typography variant="body1" className={classes.roles}>
              {roles[0] || ''}
              <span className={classes.rolesCount}>{roles.length > 1 ? ` +${roles.length - 1}` : ''}</span>
            </Typography>
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
            src="/static/assets/degree.svg"
            alt="degree"
          />
          <Typography className={classes.detailsText}>{degree}</Typography>
        </Box>
        <Box className={classes.detailsItem}>
          <img className={classes.detailsIcon} src="/static/assets/major.svg" alt="major" />
          <Typography className={classes.detailsText}>
            {major1}
            {major2 ? `, ${major2}` : ''}
          </Typography>
        </Box>
        <Box className={classes.detailsItem}>
          <img className={classes.detailsIcon} src="/static/assets/postal.svg" alt="postal" />
          <Typography className={classes.detailsText}>{postal}</Typography>
        </Box>
      </Box>
    </Box>
  );
};
