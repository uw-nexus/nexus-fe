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
import { StudentsFilter } from 'types';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingBottom: theme.spacing(20),
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
  filters: StudentsFilter;
  degreeChoices: string[];
};

const linkParams = (name, skills, roles, degree): string => {
  const q1 = name ? `&name=${encodeURIComponent(name)}` : '';
  const q2 = skills.length ? `&skills=${encodeURIComponent(skills.join(','))}` : '';
  const q3 = roles.length ? `&roles=${encodeURIComponent(roles.join(','))}` : '';
  const q4 = degree ? `&degree=${encodeURIComponent(degree)}` : '';
  return `/?mode=students${q1}${q2}${q3}${q4}`;
};

const ProjectsFilterPage: NextPage<PageProps> = ({ filters, degreeChoices }) => {
  const classes = useStyles();

  const [sort, setSort] = useState(SORT.Relevant);
  const [skills, setSkills] = useState(filters.skills);
  const [roles, setRoles] = useState(filters.roles);
  const [degree, setDegree] = useState(filters.degree);

  const handleClear = (event): void => {
    event.preventDefault();
    setSort(SORT.Relevant);
    setSkills([]);
    setRoles([]);
    setDegree('');
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
        <RadioForm value={sort} setValue={setSort} choices={[SORT.Relevant, SORT.Recent]} />

        <Typography className={classes.label}>Skills</Typography>
        <ArrayForm label="Skills" items={skills} setItems={setSkills} />

        <Typography className={classes.label}>Roles</Typography>
        <ArrayForm label="Roles" items={roles} setItems={setRoles} />

        <Typography className={classes.label}>Degree</Typography>
        <RadioForm value={degree} setValue={setDegree} choices={degreeChoices} />
      </Container>

      <Box className={classes.actionContainer}>
        <Container maxWidth="xs" disableGutters>
          <Box paddingX="20%">
            <MainButton href={linkParams(filters.name, skills, roles, degree)} label="Show Results" />
          </Box>
        </Container>
      </Box>
    </>
  );
};

ProjectsFilterPage.getInitialProps = async (ctx): Promise<PageProps> => {
  try {
    const { name, sortBy, skills, roles, degree } = ctx.query;
    const choices = await callApi(ctx, `${BE_ADDR}/choices/students`);

    return {
      filters: {
        name: (name as string) || '',
        sortBy: (sortBy as string) || SORT.Relevant,
        skills: skills ? (skills as string).split(',') : [],
        roles: roles ? (roles as string).split(',') : [],
        degree: (degree as string) || '',
      },
      degreeChoices: choices.degrees,
    };
  } catch (error) {
    redirectPage(ctx, '/join');
  }
};

export default ProjectsFilterPage;