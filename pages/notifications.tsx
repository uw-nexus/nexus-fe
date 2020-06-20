import React, { useState } from 'react';
import { NextPage } from 'next';
import { Container, Box, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SideNav from 'components/SideNav';
import InviteCard from 'components/InviteCard';
import JoinRequestCard from 'components/JoinRequestCard';
import { BE_ADDR, redirectPage, callApi, vh } from 'utils';
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
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
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
  invites: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    roles: string[];
    projects: string[];
  }[];

  requests: {
    contractId: string;
    student: {
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      roles: string[];
    };
    project: string;
  }[];
};

const NotificationsPage: NextPage<PageProps> = ({ invites, requests }) => {
  const classes = useStyles();
  const [inviteList, setInviteList] = useState(invites);
  const [requestList, setRequestList] = useState(requests);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" height="100%">
      <Container maxWidth="sm" disableGutters>
        <Grid container className={classes.heading}>
          <Grid item xs={2}>
            <SideNav iconStyle={{ padding: 0, marginLeft: '.5rem' }} />
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
        {inviteList.length + requests.length === 0 ? (
          <Box minHeight={vh(70)} display="flex" justifyContent="center" alignItems="center">
            <Typography color="textSecondary">{'No notifications'}</Typography>
          </Box>
        ) : null}

        {inviteList.length ? (
          <Box marginBottom="2rem">
            <Typography className={classes.label}>{`From Project Managers`}</Typography>
            <Box>
              {inviteList.map((inv, id) => (
                <InviteCard
                  key={id}
                  sender={inv}
                  onDelete={(): void => setInviteList(inviteList.filter((_, i) => i !== id))}
                />
              ))}
            </Box>
          </Box>
        ) : null}

        {requests.length ? (
          <Box>
            <Typography className={classes.label}>{`From Candidates`}</Typography>
            <Box>
              {requests.map((req, id) => (
                <JoinRequestCard
                  key={req.contractId}
                  {...req}
                  onDelete={(): void => setRequestList(requestList.filter((_, i) => i !== id))}
                />
              ))}
            </Box>
          </Box>
        ) : null}
      </Container>
    </Box>
  );
};

NotificationsPage.getInitialProps = async (ctx): Promise<PageProps> => {
  try {
    const props = await callApi(ctx, `${BE_ADDR}/contracts/notifications`);
    return props;
  } catch (error) {
    redirectPage(ctx, '/join');
  }
};

export default NotificationsPage;
