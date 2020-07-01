import React, { useState } from 'react';
import { NextPage } from 'next';
import { Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SearchBar from 'components/SearchBar';
import ProjectsWrapper from 'components/home/ProjectsWrapper';
import StudentsWrapper from 'components/home/StudentsWrapper';
import HomeHeader from 'components/home/HomeHeader';

import { Project, Student, ProjectsFilter, StudentsFilter } from 'types';
import { FE_ADDR, BE_ADDR, redirectPage, callApi, checkAuth } from 'utils';

enum MODE {
  Projects = 'projects',
  Recruitment = 'students',
}

const useStyles = makeStyles((theme) => ({
  main: {
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
}));

type PageProps = {
  username: string;
  authenticated: boolean;
  data: {
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

const HomePage: NextPage<PageProps> = ({ data, authenticated, username, saved, filterConfig }) => {
  const classes = useStyles();

  const [mode, setMode] = useState(filterConfig.mode === MODE.Recruitment ? MODE.Recruitment : MODE.Projects);

  const [projects, setProjects] = useState(data.projects);
  const [students, setStudentsOriginal] = useState(data.students);
  const setStudents = (arr: Student[]): void => {
    if (authenticated && username) arr = arr.filter(({ profile }) => profile.user.username !== username);
    setStudentsOriginal(arr);
  };

  const content =
    mode === MODE.Projects ? (
      <ProjectsWrapper
        projects={projects}
        setProjects={setProjects}
        savedProjects={saved.projects}
        authenticated={authenticated}
        filters={filterConfig.filters}
      />
    ) : (
      <StudentsWrapper
        students={students}
        setStudents={setStudents}
        savedStudents={saved.students}
        authenticated={authenticated}
        filters={filterConfig.filters}
      />
    );

  return (
    <Container component="main" maxWidth="md" className={classes.main}>
      <Box className={classes.controls}>
        <Container maxWidth="md" disableGutters>
          <HomeHeader
            mode={mode}
            setMode={(m): void => {
              setProjects(data.projects);
              setStudents(data.students);
              setMode(m);
            }}
            authenticated={authenticated}
          />
          <SearchBar mode={mode} setProjects={setProjects} setStudents={setStudents} filterConfig={filterConfig} />
        </Container>
      </Box>
      {content}
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

    const data = {
      projects: await callApi(
        ctx,
        `${FE_ADDR}/api/algolia/search-projects`,
        JSON.stringify({ filters: filterConfig.filters, page: 0 }),
      ),
      students: await callApi(
        ctx,
        `${FE_ADDR}/api/algolia/search-students`,
        JSON.stringify({ filters: filterConfig.filters, page: 0 }),
      ),
    };

    const props: PageProps = {
      data,
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
