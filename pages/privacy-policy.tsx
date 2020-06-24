import React from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { Container, Box, Grid, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { FONT } from 'public/static/styles/constants';
import { checkAuth } from 'utils';

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

const data = {
  'Information Gathering and Using': (
    <p>
      To create an account, you need to provide data including your name, email address and/or password. You have
      choices about the information you provide on your profile, such as your education, skills, and roles. You
      don&rsquo;t have to provide additional information; however, doing so will provide a more personalized experience
      with our services. Your profile is fully visible to all members of our website. Please do not add personal data to
      your profile that you do not want to have publicly available.
    </p>
  ),
  'Your Data': (
    <p>
      If you request to join a project, we provide the project creator with your email address. Likewise, if you invite
      someone to join a project you created, we provide invited members with your email address. We will never share
      your personal data with a third party without your consent or sell data to third parties without such consent.
    </p>
  ),
  'Ad Servers': <p>We do not partner with or have special relationships with any ad server companies.</p>,
  Changes: (
    <p>
      If we make any changes to our Privacy Policy, NEXUS UW will provide notice through our services, or by other
      means, to provide you the opportunity to review the changes. If you object to any changes, you may close your
      account.
    </p>
  ),
  Other: (
    <p>
      We may require collection of new information to introduce new features or update our services. If we collect
      materially different personal data or materially change how we collect, use or share your data, we will notify you
      and may also modify this Privacy Policy.
    </p>
  ),
};

const PrivacyPolicyPage: NextPage = () => {
  const classes = useStyles();

  const content = Object.entries(data).map(([key, value], i) => (
    <Box marginBottom="2rem" key={i}>
      <Typography className={classes.label}>{key}</Typography>
      {value}
    </Box>
  ));

  return (
    <>
      <Container maxWidth="md" disableGutters>
        <Grid container className={classes.heading}>
          <Grid item xs={2}>
            <IconButton style={{ padding: 0, marginLeft: '-10px' }} onClick={(): void => Router.back()}>
              <img src="/static/assets/back.svg" alt="back" />
            </IconButton>
          </Grid>
          <Grid item xs={8}>
            <Box display="flex" justifyContent="space-evenly" alignItems="center" height="100%">
              <Typography align="center" className={classes.title}>
                {`Privacy Policy`}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="md" className={classes.content} disableGutters>
        {content}
      </Container>
    </>
  );
};

PrivacyPolicyPage.getInitialProps = async (ctx): Promise<{ authenticated: boolean }> => {
  const { authenticated } = await checkAuth(ctx);
  return { authenticated };
};

export default PrivacyPolicyPage;
