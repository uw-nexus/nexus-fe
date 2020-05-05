import React from 'react';
import Link from 'next/link';
import { Button, Typography } from '@material-ui/core';
import { Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CopyrightFooter from 'components/CopyrightFooter';
import { checkAuth, redirectPage } from 'utils';
import { NextPage } from 'next';

const useStyles = makeStyles((theme) => ({
  outer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '90vh',
    marginTop: '5vh',
    marginBottom: 0,
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: '10vh',
    paddingBottom: '12vh',
  },
  button: {
    border: '2px solid #F05A28',
    borderRadius: '10px',
    width: '100%',
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    fontSize: theme.spacing(5),
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
  },
  text: {
    fontSize: theme.spacing(6),
  },
}));

const WelcomePage: NextPage = () => {
  const classes = useStyles();

  return (
    <>
      <Container component="main" maxWidth="xs" className={classes.outer}>
        <Box width="33%">
          <img width="100%" src="/static/images/nexus_logo.png" alt="logo" />
        </Box>
        <Box>
          <Typography component="h2" align="center" className={classes.text}>
            Let your ideas shine.
          </Typography>
          <Typography component="h2" align="center" className={classes.text}>
            Together we can go further.
          </Typography>
        </Box>
        <Box width="100%" paddingX="20%">
          <Box height="20vh" display="flex" justifyContent="space-evenly">
            <img height="100%" src="/static/images/human_woman.svg" alt="woman" />
            <img height="100%" src="/static/images/human_man.svg" alt="man" />
          </Box>
          <Link href="/login">
            <Button className={classes.button} aria-label="Join" size="large">
              Join
            </Button>
          </Link>
        </Box>
      </Container>

      <CopyrightFooter />
    </>
  );
};

WelcomePage.getInitialProps = async (ctx): Promise<{ authenticated: boolean }> => {
  const { authenticated } = await checkAuth(ctx);
  if (authenticated) redirectPage(ctx, '/');
  return { authenticated };
};

export default WelcomePage;
