import React from 'react';
import { Typography } from '@material-ui/core';
import { Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CopyrightFooter from 'components/CopyrightFooter';
import MainButton from 'components/MainButton';
import { COLORS, FONT } from 'public/static/styles/constants';
import { checkAuth, redirectPage, vh } from 'utils';
import { NextPage } from 'next';

const useStyles = makeStyles((theme) => ({
  outer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: vh(90),
    marginTop: vh(5),
    marginBottom: 0,
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    paddingTop: vh(10),
    paddingBottom: vh(12),
  },
  text: {
    fontSize: FONT.HEADING,
    color: COLORS.BLACK,
  },
}));

const WelcomePage: NextPage = () => {
  const classes = useStyles();

  return (
    <>
      <Container component="main" maxWidth="md" className={classes.outer}>
        <Box width="33%">
          <img width="100%" src="/static/assets/nexus_logo.png" alt="logo" />
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
          <Box height={vh(20)} display="flex" justifyContent="space-evenly">
            <img height="100%" src="/static/assets/human_woman.svg" alt="woman" />
            <img height="100%" src="/static/assets/human_man.svg" alt="man" />
          </Box>
          <MainButton href="/login" label="Join" />
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
