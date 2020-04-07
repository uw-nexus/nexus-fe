import React, { useState } from 'react';
import { Paper, Typography, Grid } from '@material-ui/core';

import StudentCard from './StudentCard';
import useStyles from 'public/static/styles/project';
import { BE_ADDR } from 'utils';

export default ({ contracts }): JSX.Element => {
  const classes = useStyles();

  const [requests, setRequests] = useState(contracts.filter(({ status }) => status === 'Pending'));
  const [members, setMembers] = useState(contracts.filter(({ status }) => status === 'Active'));

  const handleRequest = (contract, status) => async (): Promise<void> => {
    const res = await fetch(`${BE_ADDR}/contracts/${contract.contractId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ status }),
    });

    if (res.ok) {
      setRequests(requests.filter(({ contractId }) => contractId !== contract.contractId));
      setMembers(members.filter(({ contractId }) => contractId !== contract.contractId));
      contract.status = status;
      if (status === 'Active') setMembers([...members, contract]);
    }
  };

  return (
    <>
      <Paper className={classes.projectPaper}>
        <Typography component="h2" variant="h6">
          Requests
        </Typography>
        <Paper elevation={0} style={{ backgroundColor: 'lightgray' }}>
          <Grid container className={classes.peoplePaper}>
            {requests.length ? (
              requests.map((contract) => (
                <StudentCard
                  key={contract.contractId}
                  student={contract.student}
                  acceptRequest={handleRequest(contract, 'Active')}
                  declineRequest={handleRequest(contract, 'Removed')}
                />
              ))
            ) : (
              <p style={{ color: 'grey' }}>None</p>
            )}
          </Grid>
        </Paper>
      </Paper>

      <Paper className={classes.projectPaper}>
        <Typography component="h2" variant="h6">
          Members
        </Typography>
        <Paper elevation={0} style={{ backgroundColor: 'lightgray' }}>
          <Grid container className={classes.peoplePaper}>
            {members.length ? (
              members.map((contract) => (
                <StudentCard
                  key={contract.contractId}
                  student={contract.student}
                  acceptRequest={null}
                  declineRequest={handleRequest(contract, 'Removed')}
                />
              ))
            ) : (
              <p style={{ color: 'grey' }}>None</p>
            )}
          </Grid>
        </Paper>
      </Paper>
    </>
  );
};
