import React, { useState } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { Container, Typography, Box, Grid, IconButton, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { BE_ADDR, FE_ADDR, callApi, redirectPage, vh } from 'utils';
import { FONT, COLORS } from 'public/static/styles/constants';
import MainButton from 'components/MainButton';
import { Project, Contract } from 'types';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: theme.spacing(20),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
  heading: {
    padding: theme.spacing(4),
    paddingTop: theme.spacing(2),
  },
  saveBtn: {
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.12)',
    width: '48px',
    height: '48px',
    borderRadius: '48px',
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

  roles: {
    color: COLORS.GRAY_75,
    marginBottom: theme.spacing(7),
    '& *': {
      fontSize: FONT.LABEL,
    },
  },
  rolesItem: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    whiteSpace: 'pre',
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

  actionContainer: {
    position: 'fixed',
    bottom: 0,
    height: vh(15),
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
  },
}));

type PageProps = {
  project?: Project;
  projectId: number;
  relationship: string;
  contracts: Contract[];
  saved: boolean;
};

const ProjectPage: NextPage<PageProps> = ({ project, projectId, saved }) => {
  const classes = useStyles();
  const [saveStatus, setSaveStatus] = useState(saved);

  const data = project.details;
  const daysAgo = Math.round((new Date().getTime() - new Date(data.updatedAt).getTime()) / (1000 * 60 * 60 * 24));

  const handleJoinRequest = (event): void => {
    event.preventDefault();
  };

  const handleToggleSave = async (event): Promise<void> => {
    event.preventDefault();
    const res = await fetch(`${BE_ADDR}/saved/projects/${projectId}`, {
      method: saveStatus ? 'DELETE' : 'POST',
      credentials: 'include',
    });

    if (res.ok) setSaveStatus(!saveStatus);
  };

  return (
    <>
      <Container maxWidth="xs" disableGutters>
        <Grid container className={classes.heading}>
          <Grid item xs={2}>
            <IconButton style={{ padding: 0, marginLeft: '-10px' }} onClick={(): void => Router.back()}>
              <img src="/static/assets/back.svg" alt="back" />
            </IconButton>
          </Grid>
          <Grid item xs={8}></Grid>
          <Grid item xs={2} style={{ textAlign: 'right' }}>
            <IconButton className={classes.saveBtn} onClick={handleToggleSave}>
              <img src={`/static/assets/${saveStatus ? 'saved.svg' : 'not_saved.svg'}`} alt="toggle save" />
            </IconButton>
          </Grid>
        </Grid>
      </Container>

      <Container component="main" maxWidth="xs" className={classes.content}>
        <Box display="flex" justifyContent="space-between">
          <span className={classes.misc}>{data.status}</span>
          <span className={classes.misc}>{`Posted ${daysAgo} days ago`}</span>
        </Box>

        <Typography className={classes.title}>{data.title}</Typography>
        <Typography className={classes.interests}>{`Interests: ${project.interests.join(', ')}`}</Typography>

        <Box marginY="2rem">
          <Typography className={classes.desc}>{data.description}</Typography>
        </Box>

        <Box className={classes.roles}>
          {`Looking for `}
          {project.roles.length ? (
            project.roles.map((r, i) => (
              <span key={r}>
                {i > 0 ? <span style={{ color: COLORS.GRAY_C4 }}>{` | `}</span> : null}
                <span className={classes.rolesItem}>{r}</span>
              </span>
            ))
          ) : (
            <span className={classes.rolesItem}>any roles</span>
          )}
          {}
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
          <Box className={classes.detailsItem}>
            <img
              className={classes.detailsIcon}
              style={{ marginBottom: '1px' }}
              src="/static/assets/duration.svg"
              alt="duration"
            />
            <Typography className={classes.detailsText}>{data.duration}</Typography>
          </Box>
          <Box className={classes.detailsItem}>
            <img className={classes.detailsIcon} src="/static/assets/team_size.svg" alt="team size" />
            <Typography className={classes.detailsText}>{data.size}</Typography>
          </Box>
          <Box className={classes.detailsItem}>
            <img className={classes.detailsIcon} src="/static/assets/postal.svg" alt="postal" />
            <Typography className={classes.detailsText}>{data.postal}</Typography>
          </Box>
        </Box>

        <Typography className={classes.misc}>This project requires a small exercise for screening.</Typography>
      </Container>

      <Box className={classes.actionContainer}>
        <Container maxWidth="xs" disableGutters>
          <Box paddingX="20%">
            <MainButton label="Request to Join" onClick={handleJoinRequest} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

ProjectPage.getInitialProps = async (ctx): Promise<PageProps> => {
  try {
    const { pid } = ctx.query;
    const props: PageProps = await callApi(ctx, `${FE_ADDR}/api/project/${pid}`);
    const saved = await callApi(ctx, `${BE_ADDR}/saved`);
    props.saved = saved.projects.includes(parseInt(pid as string));
    return props;
  } catch (error) {
    redirectPage(ctx, '/login');
  }
};

export default ProjectPage;
