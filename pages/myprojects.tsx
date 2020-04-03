import React, { useState } from 'react';
import Router from 'next/router';
import { Typography, Button, IconButton } from '@material-ui/core';
import { Container, Grid } from '@material-ui/core';
import { ArrowBack, AddCircleRounded } from '@material-ui/icons';

import withNavbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import useStyles from '../static/projectlist/style';
import { BE_ADDR, callApi, checkAuth, redirectPage } from '../utils';

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
            <ProjectCard {...{ ...c, ...c.project }} />
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
            <ProjectCard {...p} />
          </Grid>)
        : <Typography color='textSecondary'>None</Typography>
      }
    </Grid>
  );

  else return null;
};

const CreateButton = () => {
  const classes = useStyles();
  return (
    <IconButton color='primary' className={classes.createButtonContainer} onClick={() => Router.push('/post')}>
      <AddCircleRounded viewBox='2 2 20 20' className={classes.createButtonIcon} />
    </IconButton>
  );
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
      <CreateButton />
    </Container>
  );
};

MyProjectsPage.getInitialProps = async (ctx) => {
  const { authenticated } = await checkAuth(ctx);
  if (!authenticated) redirectPage(ctx, '/login');

  const owned = await callApi(ctx, `${BE_ADDR}/projects/owned`);
  const contracts = await callApi(ctx, `${BE_ADDR}/contracts`);
  return { owned, contracts };
}

export default withNavbar(MyProjectsPage);
