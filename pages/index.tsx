import React, { useState } from 'react';
import { NextPage } from 'next';
import { Container, Box, Grid, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SearchBar from 'components/SearchBar';
import SideNav from 'components/SideNav';
import ProjectCard from 'components/ProjectCard';
import StudentCard from 'components/StudentCard';
import { Project, Student, ProjectsFilter, StudentsFilter } from 'types';
import { FE_ADDR, BE_ADDR, redirectPage, callApi, vh, checkAuth } from 'utils';
import { searchProjects, searchStudents } from 'utils/search';
import { COLORS, FONT } from 'public/static/styles/constants';

enum MODE {
  Projects = 'projects',
  Recruitment = 'students',
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

const HomeHeader = ({ mode, setMode, authenticated }): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={2}>
        <SideNav iconStyle={{ padding: 0, marginLeft: '.5rem' }} authenticated={authenticated} />
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
  username: string;
  authenticated: boolean;
  initialData: {
    projects: Project[];
    students: Student[];
  };
  saved: {
    projects: string[];
    students: string[];
  };
  filterConfig: {
    mode: string;
    urlParams: string;
    filters: ProjectsFilter | StudentsFilter;
  };
};

const HomePage: NextPage<PageProps> = ({ authenticated, username, initialData, saved, filterConfig }) => {
  const classes = useStyles();

  const [projects, setProjects] = useState(initialData.projects);
  const [students, setStudentsOriginal] = useState(initialData.students);
  const setStudents = (arr: Student[]): void => {
    if (authenticated && username) arr = arr.filter(({ profile }) => profile.user.username !== username);
    setStudentsOriginal(arr);
  };
  const [mode, setMode] = useState(filterConfig.mode === MODE.Recruitment ? MODE.Recruitment : MODE.Projects);

  const projectsContent = projects.length ? (
    projects.map((p) => (
      <ProjectCard
        {...p}
        key={p.details.projectId}
        allowSave={authenticated}
        saved={saved.projects.includes(p.details.projectId)}
      />
    ))
  ) : (
    <Box minHeight={vh(70)} display="flex" justifyContent="center" alignItems="center">
      <Typography color="textSecondary">{'No results found'}</Typography>
    </Box>
  );

  const studentsContent = students.length ? (
    students.map((s) => (
      <StudentCard
        {...s}
        key={s.profile.user.username}
        allowSave={authenticated}
        saved={saved.students.includes(s.profile.user.username)}
      />
    ))
  ) : (
    <Box minHeight={vh(70)} display="flex" justifyContent="center" alignItems="center">
      <Typography color="textSecondary">{'No results found'}</Typography>
    </Box>
  );

  const content = mode === MODE.Projects ? projectsContent : studentsContent;

  return (
    <Container component="main" maxWidth="md" className={classes.content}>
      <Box className={classes.controls}>
        <Container maxWidth="md" disableGutters>
          <HomeHeader
            mode={mode}
            setMode={(m): void => {
              setProjects(initialData.projects);
              setStudents(initialData.students);
              setMode(m);
            }}
            authenticated={authenticated}
          />
          <SearchBar mode={mode} setProjects={setProjects} setStudents={setStudents} filterConfig={filterConfig} />
        </Container>
      </Box>
      <Box minHeight={vh(80)}>{content}</Box>
    </Container>
  );
};

HomePage.getInitialProps = async (ctx): Promise<PageProps> => {
  try {
    const { authenticated } = await checkAuth(ctx);

    const q = ctx.query;
    const filterConfig = {
      mode: '',
      urlParams: '',
      filters: {
        query: (q.query as string) || '',
        skills: q.skills ? (q.skills as string).split(',') : [],
        roles: q.roles ? (q.roles as string).split(',') : [],
        interests: q.interests ? (q.interests as string).split(',') : [],
        duration: (q.duration as string) || '',
        teamSize: (q.teamSize as string) || '',
        degree: (q.degree as string) || '',
        sortBy: (q.sortBy as string) || 'recency',
      },
    };

    const fParamsArr = [];
    for (const k in ctx.query) {
      if (k === 'mode') filterConfig.mode = ctx.query[k] as string;
      else if (k !== 'query') fParamsArr.push(`&${k}=${encodeURIComponent(ctx.query[k] as string)}`);
    }
    filterConfig.urlParams = fParamsArr.join('');

    const initialData = {
      projects: await searchProjects(filterConfig.filters),
      students: await searchStudents(filterConfig.filters),
    };

    const props: PageProps = {
      initialData,
      filterConfig,
      authenticated,
      saved: {
        projects: [],
        students: [],
      },
      username: '',
    };

    if (authenticated) {
      const saved = await callApi(ctx, `${BE_ADDR}/saved`);
      const { username } = await callApi(ctx, `${FE_ADDR}/api/user`);
      props.saved = saved;
      props.username = username;
    }

    return props;
  } catch (error) {
    redirectPage(ctx, '/join');
  }
};

export default HomePage;
