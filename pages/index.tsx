import React, { useState } from 'react';
import { NextPage } from 'next';
import { Container, Box, Grid, IconButton, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SearchBar from 'components/SearchBar';
import ProjectCard from 'components/ProjectCard';
import StudentCard from 'components/StudentCard';
import { FE_ADDR, BE_ADDR, redirectPage, callApi } from 'utils';
import { Project, Student, ProjectsFilter, StudentsFilter } from 'types';
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
  username: string;
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

const HomePage: NextPage<PageProps> = ({ username, initialData, saved, filterConfig }) => {
  const classes = useStyles();

  const [projects, setProjects] = useState(initialData.projects);
  const [students, setStudentsOriginal] = useState(initialData.students);
  const setStudents = (arr: Student[]): void => {
    arr = arr.filter(({ profile }) => profile.user.username !== username);
    setStudentsOriginal(arr);
  };
  const [mode, setMode] = useState(filterConfig.mode === MODE.Recruitment ? MODE.Recruitment : MODE.Projects);

  const content =
    mode === MODE.Projects
      ? projects.map((p) => (
          <ProjectCard key={p.details.projectId} {...p} saved={saved.projects.includes(p.details.projectId)} />
        ))
      : students.map((s) => (
          <StudentCard key={s.profile.user.username} {...s} saved={saved.students.includes(s.profile.user.username)} />
        ));

  return (
    <Container component="main" maxWidth="xs" className={classes.content}>
      <Box className={classes.controls}>
        <Container maxWidth="xs" disableGutters>
          <HomeNav
            mode={mode}
            setMode={(m): void => {
              setProjects(initialData.projects);
              setStudents(initialData.students);
              setMode(m);
            }}
          />
          <SearchBar mode={mode} setProjects={setProjects} setStudents={setStudents} filterConfig={filterConfig} />
        </Container>
      </Box>
      <Box>{content}</Box>
    </Container>
  );
};

HomePage.getInitialProps = async (ctx): Promise<PageProps> => {
  try {
    const q = ctx.query;
    const filterConfig = {
      mode: '',
      urlParams: '',
      filters: {
        name: (q.name as string) || '',
        skills: q.skills ? (q.skills as string).split(',') : [],
        roles: q.roles ? (q.roles as string).split(',') : [],
        interests: q.interests ? (q.interests as string).split(',') : [],
        duration: (q.duration as string) || '',
        teamSize: (q.teamSize as string) || '',
        degree: (q.degree as string) || '',
      },
    };

    const fParamsArr = [];
    for (const k in ctx.query) {
      if (k === 'mode') filterConfig.mode = ctx.query[k] as string;
      else if (k !== 'name') fParamsArr.push(`&${k}=${encodeURIComponent(ctx.query[k] as string)}`);
    }
    filterConfig.urlParams = fParamsArr.join('');

    const f = filterConfig.filters;
    const initialData = {
      projects: await callApi(
        ctx,
        `${FE_ADDR}/api/search/projects`,
        JSON.stringify({
          filters:
            filterConfig.mode === MODE.Recruitment
              ? { details: { title: f.name } }
              : {
                  details: {
                    title: f.name,
                    size: f.teamSize,
                    duration: f.duration,
                  },
                  skills: f.skills,
                  roles: f.roles,
                  interests: f.interests,
                },
        }),
      ),

      students: await callApi(
        ctx,
        `${FE_ADDR}/api/search/students`,
        JSON.stringify({
          filters:
            filterConfig.mode !== MODE.Recruitment
              ? { profile: { firstName: f.name } }
              : {
                  profile: {
                    firstName: f.name,
                    degree: f.degree,
                  },
                  skills: f.skills,
                  roles: f.roles,
                },
        }),
      ),
    };

    const saved = await callApi(ctx, `${BE_ADDR}/saved`);
    const { username } = await callApi(ctx, `${FE_ADDR}/api/user`);

    return { username, initialData, saved, filterConfig };
  } catch (error) {
    redirectPage(ctx, '/join');
  }
};

export default HomePage;
