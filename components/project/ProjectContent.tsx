import React, { useState } from 'react';
import { Typography, Grid, Chip, Select } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FONT, COLORS } from 'public/static/styles/constants';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: theme.spacing(20),
    '& > *': {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
  },
  contentHeader: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    paddingTop: theme.spacing(2),
  },

  misc: {
    fontSize: FONT.MISC,
    color: COLORS.GRAY_C4,
  },
  title: {
    fontSize: FONT.HEADING,
  },
  interests: {
    fontSize: '.875rem',
    color: COLORS.GRAY_75,
  },
  desc: {
    fontSize: '.875rem',
  },

  roleDetails: {
    marginBottom: theme.spacing(7),
    '& *': {
      fontSize: '.875rem',
    },
  },

  skills: {
    color: COLORS.GRAY_C4,
    marginBottom: theme.spacing(7),
    '& *': {
      fontSize: '.875rem',
    },
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
    paddingRight: theme.spacing(5),
    marginBottom: theme.spacing(7),
  },
  detailsItem: {
    display: 'flex',
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

export default ({ project }): JSX.Element => {
  const classes = useStyles();
  const [role, setRole] = useState(project.roles.length > 0 ? project.roles[0] : '');

  const data = project.details;
  const daysAgo = Math.round((new Date().getTime() - new Date(data.updatedAt).getTime()) / (1000 * 60 * 60 * 24)) || 0;

  return (
    <Box className={classes.content}>
      <Box display="flex" justifyContent="space-between" marginBottom=".5rem">
        <span className={classes.misc}>{data.status}</span>
        <span className={classes.misc}>{`Updated ${daysAgo} day${daysAgo === 1 ? '' : 's'} ago`}</span>
      </Box>

      <Box className={classes.contentHeader}>
        <Typography className={classes.title}>{data.title}</Typography>
        <Typography className={classes.interests}>{`Interests: ${project.interests.join(', ')}`}</Typography>
        <Box marginTop="2rem" marginBottom="1rem">
          <Typography className={classes.desc}>{data.description}</Typography>
        </Box>
      </Box>

      <Box marginY="2rem">
        <Typography>{`Roles Needed`}</Typography>
        <Box marginTop="1rem">
          <Select
            native
            fullWidth
            value={role}
            variant="outlined"
            disabled={project.roles.length === 0}
            inputProps={{ name: 'active-role', id: 'active-role' }}
            onChange={(e): void => setRole(e.target.value as string)}
          >
            {project.roles.length ? null : <option value="">{'No roles found'}</option>}
            {project.roles.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </Select>
        </Box>
      </Box>

      <Box className={classes.roleDetails}>
        <Box marginBottom=".4rem">
          <Typography color="textSecondary">{`Screening Exercise:`}</Typography>
        </Box>
        <Typography>{project.exercises[role] || 'None'}</Typography>
      </Box>

      <Box className={classes.skills}>
        <Box marginBottom=".4rem">
          <Typography>{`Preferred Skills:`}</Typography>
        </Box>
        <Grid container spacing={3} justify="flex-start" alignItems="flex-start">
          {project.skills.map((s) => (
            <Grid item key={s}>
              <Chip label={s} className={classes.skillsItem} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box className={classes.detailsContainer}>
        {data.duration ? (
          <Box className={classes.detailsItem}>
            <img
              className={classes.detailsIcon}
              style={{ marginBottom: '1px' }}
              src="/static/assets/duration.svg"
              alt="duration"
            />
            <Typography className={classes.detailsText}>{data.duration}</Typography>
          </Box>
        ) : null}
        {data.size ? (
          <Box className={classes.detailsItem}>
            <img className={classes.detailsIcon} src="/static/assets/team_size.svg" alt="team size" />
            <Typography className={classes.detailsText}>{data.size}</Typography>
          </Box>
        ) : null}
        {data.postal ? (
          <Box className={classes.detailsItem}>
            <img className={classes.detailsIcon} src="/static/assets/postal.svg" alt="postal" />
            <Typography className={classes.detailsText}>{data.postal}</Typography>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};
