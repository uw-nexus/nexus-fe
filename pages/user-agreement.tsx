import React from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { Container, Box, Grid, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { FONT } from 'public/static/styles/constants';

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
  Contract: (
    <>
      <Typography>
        You agree that by clicking &quot;Sign Up&quot; or similar, registering or using our services, you agree to enter
        into a legally binding contract with NEXUS UW (also referred to as &quot;we&quot; and &quot;us&quot;).. If you
        wish to terminate this contract, at any time, you can do so by closing your account and no longer using our
        services.
      </Typography>
      <br />
      <Typography>
        As a member of our services, the collection, use and sharing of your personal data is subject to our Privacy
        Policy.
      </Typography>
    </>
  ),
  Changes: (
    <Typography>
      We reserve the right to modify this contract and our privacy policy from time to time. If we make any changes to
      our User Agreement, NEXUS UW will provide notice through our services, or by other means, to provide you the
      opportunity to review the changes. If you object to any changes, you may close your account.
    </Typography>
  ),
  'Your Account': (
    <Typography>
      Members are account holders. You agree to use a strong password and keep it confidential and not transfer any part
      of your account. You are responsible for anything that happens through your account unless you close it.
    </Typography>
  ),
  'Rights and Limits': (
    <Typography>
      When you share information on our website through your profile or project postings, any user and nonuser of our
      services can see, copy and use that information. Where we have made settings available, we will honor the choices
      you make about who can see your profile or projects.
    </Typography>
  ),
  "Do's and Dont's": (
    <>
      <Typography>
        Do's
        <br />
        a. Provide accurate information to us and keep it updated;
        <br />
        b. Use your real name on your profile;
        <br />
        c. Use the website in a professional manner; and
        <br />
        d. Comply with all applicable laws.
      </Typography>
      <br />
      <Typography>
        Dont's
        <br />
        a. Create a false identity or misrepresent your identity;
        <br />
        b. Develop or use software to copy profiles and other data from the website;
        <br />
        c. Disclose confidential information without the authority to disclose;
        <br />
        d. Violate the intellectual property rights of others; and
        <br />
        e. Post anything that contains software viruses or any other harmful code.
      </Typography>
    </>
  ),
  Disclaimer: (
    <Typography>
      NEXUS UW makes no warranty that the site will be uninterrupted or error-free. NEXUS UW will not be liable for any
      lost business opportunities, reputation, loss of data, or any indirect damages. NEXUS UW provides the services on
      an &quot;as is&quot; basis.
    </Typography>
  ),
  Termination: (
    <Typography>
      Both you and NEXUS UW may terminate this contract at any time with notice to the other. On termination, you lose
      the right to access our services.
    </Typography>
  ),
  'Dispute resolution and arbitration': (
    <Typography>
      Both you and NEXUS UW agree that any dispute, claim, or controversy between you and NEXUS UW arising in connection
      with or relating in any way to this agreement will be determined by mandatory binding individual arbitration.
    </Typography>
  ),
};

const UserAgreementPage: NextPage = () => {
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
                {`User Agreement`}
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

export default UserAgreementPage;
