import React, { useState } from 'react';
import Router from 'next/router';
import { Avatar, Typography, Link, Button, IconButton } from '@material-ui/core';
import { Container, Paper, Grid } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

import withNavbar from '../components/Navbar';
import useStyles from '../static/projectlist/style';
import { callApi, checkAuth, redirectPage, formatDateFE } from '../utils';

const ProjectCard = ({ projectId, title, startDate, endDate, status }) => {
  const classes = useStyles();

  return (
    <Link href={`/project/${projectId}`} underline='none'>
      <Paper elevation={2}>
        <Grid container className={classes.projectCard}>
          <Grid item xs={3} container justify='center' alignItems='center'>
            <Avatar className={classes.projectPic}
              variant='rounded'
              alt='Project Picture'
              src={''}
            />
          </Grid>
          <Grid item xs={9}>
            <Typography>{title}</Typography>
            <Typography color='textSecondary'>{status}</Typography>
            <Typography color='textSecondary'>{formatDateFE(startDate)} - {formatDateFE(endDate)}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Link>
  );
}

const TABS = {
  JOINED: 0,
  OWNED: 1
};

const TabContent = ({ tab, contracts, owned }) => {
  if (tab == TABS.JOINED) return (
    <Grid container justify='space-around'>
      { contracts.length
        ? contracts.map(c =>
          <Grid item xs={12} key={c.contractId}>
            <ProjectCard owned={false} {...{ ...c, ...c.project }} />
          </Grid>)
        : <Typography color='textSecondary'>None</Typography>
      }
    </Grid>
  );

  if (tab == TABS.OWNED) return (
    <Grid container justify='space-around'>
      { owned.length
        ? owned.map(p =>
          <Grid item xs={12} key={p.projectId}>
            <ProjectCard owned={true} {...p} />
          </Grid>)
        : <Typography color='textSecondary'>None</Typography>
      }
    </Grid>
  );

  else return null;
};

const MyProjectsPage = ({ owned, contracts }) => {
  const classes = useStyles();
  const [tab, setTab] = useState(TABS.JOINED);

  return (
    <Container component='main' maxWidth='xs' className={classes.outer}>
      <Grid container>
        <Grid item container xs={3} justify='center'>
          <IconButton onClick={() => Router.back()}>
            <ArrowBack fontSize='large' />
          </IconButton>
        </Grid>
      </Grid>

      <Grid container justify='space-around' className={classes.tabNav}>
        <Grid item xs={3} className={classes.tab}>
          <Button disableRipple
            className={tab == TABS.JOINED ? classes.highlight : ''}
            onClick={() => setTab(TABS.JOINED)}
          >
            <h3 style={{ marginBottom: 0 }}>Joined</h3>
          </Button>
        </Grid>

        <Grid item xs={3} className={classes.tab}>
          <Button disableRipple
            className={tab == TABS.OWNED ? classes.highlight : ''}
            onClick={() => setTab(TABS.OWNED)}
          >
            <h3 style={{ marginBottom: 0 }}>Owned</h3>
          </Button>
        </Grid>
      </Grid>

      <TabContent tab={tab} contracts={contracts} owned={owned} />
    </Container>
  );
}

MyProjectsPage.getInitialProps = async (ctx) => {
  const { authenticated } = await checkAuth(ctx);
  if (!authenticated) redirectPage(ctx, '/login');

  const owned = await callApi(ctx, `${process.env.BE_ADDR}/projects/owned`);
  const contracts = await callApi(ctx, `${process.env.BE_ADDR}/contracts`);
  return { owned, contracts };
}

export default withNavbar(MyProjectsPage);
