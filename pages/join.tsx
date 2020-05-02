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
    justifyContent: 'space-evenly',
    alignItems: 'center',
    minHeight: 'calc(100% - 6rem)',
    marginTop: '2rem',
    marginBottom: 0,
  },
  text: {
    fontSize: theme.spacing(3),
    textAlign: 'center',
  },
  button: {
    border: '2px solid #F05A28',
    borderRadius: '10px',
    width: '100%',
    color: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
  },
}));

const WelcomePage: NextPage = () => {
  const classes = useStyles();

  return (
    <>
      <Container component="main" maxWidth="xs" className={classes.outer}>
        <Box width="33%">
          <img width="100%" src="/static/nexus_logo.png" alt="logo" />
        </Box>
        <Box>
          <Typography variant="h5" className={classes.text}>
            Let your ideas shine.
          </Typography>
          <Typography variant="h5" className={classes.text}>
            Together we can go further.
          </Typography>
        </Box>
        <Box width="60%">
          <img width="100%" src="/static/nexus_logo.png" alt="logo" />
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
