import React, { useState } from 'react';
import { Button, Grid, Paper, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import BasicData from './BasicData';
import SkillsForm from './SkillsForm';
import { NextPage } from 'next';
import { Student } from 'types';

const useStyles = makeStyles(() => ({
  tab: {
    textAlign: 'center',
  },

  highlight: {
    color: 'orange',
    borderBottom: '2px solid orange',
    borderRadius: 0,
  },

  paper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2rem',
    padding: '2rem',
    borderRadius: '10px',
  },

  profilePaper: {
    width: '100%',
    minHeight: '60vh',
    marginBottom: 0,
    borderRadius: '25px 25px 0 0',
    justifyContent: 'flex-start',
    padding: 0,
  },
}));

const TABS = {
  BASIC: 0,
  SKILLS: 1,
  INTERESTS: 2,
};

type TabContentProps = {
  tab: number;
  student: Student;
};

const TabContent: NextPage<TabContentProps> = ({ tab, student }) => {
  if (tab === TABS.BASIC) return <BasicData student={student} />;
  if (tab === TABS.SKILLS) return <SkillsForm student={student} />;
  else return null;
};

type TabNavProps = {
  tab: number;
  setTab(t: number): void;
};

const TabNav: NextPage<TabNavProps> = ({ tab, setTab }) => {
  const classes = useStyles();

  return (
    <>
      <Grid container justify="space-around">
        <Grid item xs={3} className={classes.tab}>
          <Button
            disableRipple
            aria-label="Basic"
            className={tab === TABS.BASIC ? classes.highlight : ''}
            onClick={(): void => setTab(TABS.BASIC)}
          >
            <h3 style={{ marginBottom: 0 }}>Basic</h3>
          </Button>
        </Grid>

        <Grid item xs={3} className={classes.tab}>
          <Button
            disableRipple
            aria-label="Skills"
            className={tab === TABS.SKILLS ? classes.highlight : ''}
            onClick={(): void => setTab(TABS.SKILLS)}
          >
            <h3 style={{ marginBottom: 0 }}>Skills</h3>
          </Button>
        </Grid>

        <Grid item xs={4} className={classes.tab}>
          <Button
            disableRipple
            aria-label="Interests"
            className={tab === TABS.INTERESTS ? classes.highlight : ''}
            onClick={(): void => setTab(TABS.INTERESTS)}
          >
            <h3 style={{ marginBottom: 0 }}>Interests</h3>
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ({ student }): JSX.Element => {
  const classes = useStyles();
  const [tab, setTab] = useState(TABS.BASIC);

  return (
    <Paper elevation={8} className={`${classes.paper} ${classes.profilePaper}`}>
      <TabNav tab={tab} setTab={(t): void => setTab(t)} />
      <Box p={5} style={{ width: '100%' }}>
        <TabContent tab={tab} student={student} />
      </Box>
    </Paper>
  );
};
