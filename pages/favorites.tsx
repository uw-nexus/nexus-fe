import React from 'react';
import { NextPage } from 'next';
import { Container, Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SideNav from 'components/SideNav';
import ProjectCard from 'components/ProjectCard';
import StudentCard from 'components/StudentCard';
import { BE_ADDR, redirectPage, callApi } from 'utils';
import { getProjects, getStudents } from 'utils/search';
import { FONT } from 'public/static/styles/constants';
import { Project, Student } from 'types';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: theme.spacing(20),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  heading: {
    padding: theme.spacing(4),
    paddingTop: theme.spacing(2),
  },
  title: {
    fontSize: FONT.HEADING,
    color: theme.palette.text.primary,
  },
  label: {
    fontWeight: 'bold',
    color: theme.palette.text.primary,
  },
}));

type PageProps = {
  projects: Project[];
  students: Student[];
};

const FavoritesPage: NextPage<PageProps> = ({ projects, students }) => {
  const classes = useStyles();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" height="100%">
      <Container maxWidth="sm" disableGutters>
        <Grid container className={classes.heading}>
          <Grid item xs={2}>
            <SideNav iconStyle={{ padding: 0, marginLeft: '-10px' }} />
          </Grid>
          <Grid item xs={8}>
            <Box display="flex" justifyContent="space-evenly" alignItems="center" height="100%">
              <Typography align="center" className={classes.title}>
                {`Favorites`}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="sm" className={classes.content} disableGutters>
        <Box>
          <Typography className={classes.label}>{`Favorite Projects`}</Typography>
          <Box>
            {projects.map((p) => (
              <ProjectCard key={p.details.projectId} {...p} saved={true} />
            ))}
          </Box>
        </Box>

        <Box marginTop="2rem">
          <Typography className={classes.label}>{`Favorite Candidates`}</Typography>
          <Box>
            {students.map((s) => (
              <StudentCard key={s.profile.user.username} {...s} saved={true} />
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

FavoritesPage.getInitialProps = async (ctx): Promise<PageProps> => {
  try {
    const saved = await callApi(ctx, `${BE_ADDR}/saved`);
    const projects = (await getProjects(saved.projects)) as Project[];
    const students = (await getStudents(saved.students)) as Student[];
    return { projects, students };
  } catch (error) {
    redirectPage(ctx, '/join');
  }
};

export default FavoritesPage;
