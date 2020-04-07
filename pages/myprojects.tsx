import React, { useState } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { Typography, Button, IconButton, Link } from '@material-ui/core';
import { Container, Grid } from '@material-ui/core';
import { ArrowBack, AddCircleRounded } from '@material-ui/icons';

import withNavbar from 'components/Navbar';
import ProjectCard from 'components/ProjectCard';
import useStyles from 'public/static/styles/projectlist';
import { BE_ADDR, callApi, redirectPage } from 'utils';
import { Contract, ProjectDetails } from 'types';

const TABS = {
  JOINED: 0,
  OWNED: 1,
};

type ContentProps = {
  tab: number;
  contracts: Contract[];
  owned: ProjectDetails[];
};

const TabContent: NextPage<ContentProps> = ({ tab, contracts, owned }) => {
  if (tab === TABS.JOINED)
    return (
      <Grid container justify="space-around">
        {contracts.length ? (
          contracts.map((c) => (
            <Grid item xs={12} key={c.contractId}>
              <ProjectCard {...{ ...c, ...c.project }} />
            </Grid>
          ))
        ) : (
          <Typography color="textSecondary">None</Typography>
        )}
      </Grid>
    );

  if (tab === TABS.OWNED)
    return (
      <Grid container justify="space-around">
        {owned.length ? (
          owned.map((p) => (
            <Grid item xs={12} key={p.projectId}>
              <ProjectCard {...p} />
            </Grid>
          ))
        ) : (
          <Typography color="textSecondary">None</Typography>
        )}
      </Grid>
    );
  else return null;
};

const CreateButton: NextPage = () => {
  const classes = useStyles();
  return (
    <Link href="/post">
      <IconButton color="primary" aria-label="Create" className={classes.createButtonContainer}>
        <AddCircleRounded viewBox="2 2 20 20" className={classes.createButtonIcon} />
      </IconButton>
    </Link>
  );
};

type PageProps = {
  contracts: Contract[];
  owned: ProjectDetails[];
};

const MyProjectsPage: NextPage<PageProps> = ({ contracts, owned }) => {
  const classes = useStyles();
  const [tab, setTab] = useState(TABS.JOINED);

  return (
    <Container component="main" maxWidth="xs" className={classes.outer}>
      <Grid container>
        <Grid item container xs={3} justify="center">
          <IconButton aria-label="Back" onClick={(): void => Router.back()}>
            <ArrowBack fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>

      <Grid container justify="space-around" className={classes.tabNav}>
        <Grid item xs={3} className={classes.tab}>
          <Button
            disableRipple
            aria-label="Joined Projects"
            className={tab === TABS.JOINED ? classes.highlight : ''}
            onClick={(): void => setTab(TABS.JOINED)}
          >
            <h3 style={{ marginBottom: 0 }}>Joined</h3>
          </Button>
        </Grid>

        <Grid item xs={3} className={classes.tab}>
          <Button
            disableRipple
            aria-label="Owned Projects"
            className={tab === TABS.OWNED ? classes.highlight : ''}
            onClick={(): void => setTab(TABS.OWNED)}
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

MyProjectsPage.getInitialProps = async (ctx): Promise<PageProps> => {
  try {
    const contracts = await callApi(ctx, `${BE_ADDR}/contracts`);
    const owned = await callApi(ctx, `${BE_ADDR}/projects/owned`);
    return { contracts, owned };
  } catch (error) {
    redirectPage(ctx, '/login');
  }
};

export default withNavbar(MyProjectsPage);
