import React, { useState } from 'react';
import { NextPage } from 'next';
import { Container, Box, Grid, IconButton, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ProjectSearchBar from 'components/search/ProjectSearchBar';
import StudentSearchBar from 'components/search/StudentSearchBar';
import ProjectCard from 'components/ProjectCard';
import StudentCard from 'components/StudentCard';
import { FE_ADDR, redirectPage, callApi } from 'utils';
import { Project, Student } from 'types';
import { COLORS, FONT } from 'public/static/styles/constants';

enum MODE {
  Projects,
  Recruitment,
}

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    marginTop: theme.spacing(32),
  },
  controls: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    backgroundColor: 'white',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    zIndex: 10,
  },
  btn: {
    color: COLORS.GRAY_C4,
    fontWeight: 'bold',
    fontSize: FONT.LABEL,
    '&:hover': {
      color: theme.palette.primary.light,
      backgroundColor: 'transparent',
    },
  },
  highlight: {
    color: theme.palette.primary.main,
  },
}));

const HomeNav = ({ mode, setMode }): JSX.Element => {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={2}>
        <IconButton style={{ padding: 0, marginLeft: '.5rem' }}>
          <img src="/static/assets/menu.svg" alt="menu" />
        </IconButton>
      </Grid>
      <Grid item xs={8}>
        <Box display="flex" justifyContent="space-evenly" alignItems="center" height="100%">
          <Button
            disableRipple
            aria-label="Projects"
            className={`${classes.btn} ${mode === MODE.Projects ? classes.highlight : ''}`}
            onClick={(): void => setMode(MODE.Projects)}
          >
            Projects
          </Button>
          <Button
            disableRipple
            aria-label="Recruitment"
            className={`${classes.btn} ${mode === MODE.Recruitment ? classes.highlight : ''}`}
            onClick={(): void => setMode(MODE.Recruitment)}
          >
            Recruitment
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

type PageProps = {
  initialProjects: Project[];
  initialStudents: Student[];
};

const HomePage: NextPage<PageProps> = ({ initialProjects, initialStudents }) => {
  const classes = useStyles();

  const [projects, setProjects] = useState(initialProjects);
  const [students, setStudents] = useState(initialStudents);
  const [mode, setMode] = useState(MODE.Projects);

  const searchBar =
    mode === MODE.Projects ? (
      <ProjectSearchBar setProjects={setProjects} />
    ) : (
      <StudentSearchBar setStudents={setStudents} />
    );

  const content =
    mode === MODE.Projects
      ? projects.map((p) => <ProjectCard key={p.details.projectId} {...p} />)
      : students.map((s) => <StudentCard key={s.profile.user.username} {...s} />);

  return (
    <Container component="main" maxWidth="xs" className={classes.content}>
      <Box className={classes.controls}>
        <Container maxWidth="xs" disableGutters>
          <HomeNav
            mode={mode}
            setMode={(m): void => {
              setProjects(initialProjects);
              setStudents(initialStudents);
              setMode(m);
            }}
          />
          {searchBar}
        </Container>
      </Box>
      <Box>{content}</Box>
    </Container>
  );
};

HomePage.getInitialProps = async (ctx): Promise<PageProps> => {
  try {
    const initialProjects = await callApi(ctx, `${FE_ADDR}/api/search/projects`);
    const initialStudents = await callApi(ctx, `${FE_ADDR}/api/search/students`);
    return { initialProjects, initialStudents };
  } catch (error) {
    redirectPage(ctx, '/join');
  }
};

export default HomePage;
