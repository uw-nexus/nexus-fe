import React, { useState } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { Container, Typography, Box, Button, Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ArrayForm from 'components/ArrayForm';
import RadioForm from 'components/RadioForm';
import { BE_ADDR, callApi, redirectPage, vh } from 'utils';
import { COLORS, FONT } from 'public/static/styles/constants';
import MainButton from 'components/MainButton';
import { ProjectsFilter } from 'types';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: theme.spacing(20),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  heading: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  title: {
    fontSize: FONT.HEADING,
    color: theme.palette.text.primary,
  },
  label: {
    fontWeight: 'bold',
    color: theme.palette.text.primary,
  },
  clear: {
    borderRadius: '2rem',
    padding: 0,
    fontWeight: 'bold',
    fontSize: FONT.LABEL,
    color: COLORS.GRAY_BB,
    marginRight: theme.spacing(2.5),
  },
  actionContainer: {
    position: 'fixed',
    bottom: 0,
    height: vh(15),
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    borderTop: `1px solid ${COLORS.GRAY_DA}`,
    backgroundColor: 'white',
  },
}));

enum SORT {
  Relevant = 'Most relevant',
  Recent = 'Most recent',
}

type PageProps = {
  filters: ProjectsFilter;
  options: {
    durations: string[];
    sizes: string[];
    skills: string[];
    roles: string[];
    interests: string[];
  };
};

const linkParams = (query, duration, size, skills, roles, interests, sortBy): string => {
  const q1 = query ? `&query=${encodeURIComponent(query)}` : '';
  const q2 = duration ? `&duration=${encodeURIComponent(duration)}` : '';
  const q3 = size ? `&teamSize=${encodeURIComponent(size)}` : '';
  const q4 = skills.length ? `&skills=${encodeURIComponent(skills.join(','))}` : '';
  const q5 = roles.length ? `&roles=${encodeURIComponent(roles.join(','))}` : '';
  const q6 = interests.length ? `&interests=${encodeURIComponent(interests.join(','))}` : '';
  return `/?mode=project${q1}${q2}${q3}${q4}${q5}${q6}&sortBy=${sortBy === SORT.Relevant ? 'relevance' : 'recency'}`;
};

const ProjectsFilterPage: NextPage<PageProps> = ({ filters, options }) => {
  const classes = useStyles();

  const [sort, setSort] = useState(SORT.Relevant);
  const [skills, setSkills] = useState(filters.skills);
  const [roles, setRoles] = useState(filters.roles);
  const [interests, setInterests] = useState(filters.interests);
  const [duration, setDuration] = useState(filters.duration);
  const [size, setSize] = useState(filters.teamSize);

  const handleClear = (event): void => {
    event.preventDefault();
    setSort(SORT.Relevant);
    setSkills([]);
    setRoles([]);
    setInterests([]);
    setDuration('');
    setSize('');
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
          <Grid item xs={8}>
            <Box display="flex" justifyContent="space-evenly" alignItems="center" height="100%">
              <Typography align="center" className={classes.title}>
                Filters
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Container component="main" maxWidth="xs" className={classes.content}>
        <Box display="flex" justifyContent="space-between">
          <Typography className={classes.label}>Sort By</Typography>
          <Button onClick={handleClear} className={classes.clear}>
            Clear All
          </Button>
        </Box>
        <RadioForm value={sort} setValue={setSort} options={[SORT.Relevant, SORT.Recent]} />

        <Typography className={classes.label}>Skills</Typography>
        <ArrayForm label="Skills" items={skills} setItems={setSkills} options={options.skills} />

        <Typography className={classes.label}>Roles</Typography>
        <ArrayForm label="Roles" items={roles} setItems={setRoles} options={options.roles} />

        <Typography className={classes.label}>Areas of Interests</Typography>
        <ArrayForm label="Interests" items={interests} setItems={setInterests} options={options.interests} />

        <Typography className={classes.label}>Project Duration</Typography>
        <RadioForm value={duration} setValue={setDuration} options={options.durations} />

        <Typography className={classes.label}>Team Size</Typography>
        <RadioForm value={size} setValue={setSize} options={options.sizes} />
      </Container>

      <Box className={classes.actionContainer}>
        <Container maxWidth="xs" disableGutters>
          <Box paddingX="20%">
            <MainButton
              href={linkParams(filters.query, duration, size, skills, roles, interests, sort)}
              label="Show Results"
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

ProjectsFilterPage.getInitialProps = async (ctx): Promise<PageProps> => {
  try {
    const { sortBy, query, duration, teamSize, skills, roles, interests } = ctx.query;
    const options = await callApi(ctx, `${BE_ADDR}/options/projects`);

    return {
      filters: {
        sortBy: (sortBy as string) || SORT.Relevant,
        query: (query as string) || '',
        duration: (duration as string) || '',
        teamSize: (teamSize as string) || '',
        skills: skills ? (skills as string).split(',') : [],
        roles: roles ? (roles as string).split(',') : [],
        interests: interests ? (interests as string).split(',') : [],
      },
      options,
    };
  } catch (error) {
    redirectPage(ctx, '/join');
  }
};

export default ProjectsFilterPage;
