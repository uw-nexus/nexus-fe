import React, { useState } from 'react';
import { Link, IconButton } from '@material-ui/core';
import { Paper, Typography, Grid } from '@material-ui/core';
import { CheckCircle, Cancel } from '@material-ui/icons';
import useStyles from '../../static/project/style';

const StudentCard = ({ student, acceptRequest, declineRequest }) => {
  const classes = useStyles();
  const { firstName, lastName, user: { username } } = student;

  return (
    <Grid item xs={12} container 
      justify='space-evenly' alignItems='center' 
      className={classes.memberEntry}
      >
      <Grid item xs={7}>
        <Link href={`/user/${username}`} color='inherit' 
          style={{ fontWeight: 'bold', paddingLeft: '1rem' }}
          >
          {firstName} {lastName}
        </Link>
      </Grid>
      <Grid item xs={4} container justify='space-around'>
        {acceptRequest
          ? <IconButton aria-label='accept' onClick={acceptRequest} style={{ padding: '.5rem' }}>
              <CheckCircle />
            </IconButton>
          : null
        }
        <IconButton aria-label='decline' onClick={declineRequest} style={{ padding: '.5rem' }}>
          <Cancel />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default ({ contracts }) => {
  const classes = useStyles();
  
  const [requests, setRequests] = useState(contracts.filter(({ status }) => status == 'Pending'));
  const [members, setMembers] = useState(contracts.filter(({ status }) => status == 'Active'));

  const handleRequest = (contract, status) => async () => {
    const res = await fetch(`${process.env.BE_ADDR}/contracts/${contract.contractId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ status })
    });

    if (res.ok) {
      setRequests(requests.filter(({ contractId }) => contractId != contract.contractId));
      setMembers(members.filter(({ contractId }) => contractId != contract.contractId));
      contract.status = status;
      if (status === 'Active') setMembers([...members, contract]);
    }
  };
  
  return (
    <React.Fragment>
      <Paper className={classes.projectPaper}>
        <Typography component='h2' variant='h6'>Requests</Typography>
        <Paper elevation={0} style={{ backgroundColor: 'lightgray' }}>
          <Grid container className={classes.peoplePaper}>
            {requests.length
              ? requests.map(contract =>
                  <StudentCard
                    key={contract.contractId} student={contract.student} 
                    acceptRequest={handleRequest(contract, 'Active')} 
                    declineRequest={handleRequest(contract, 'Removed')}
                    />
                )
              : <p style={{ color: 'grey' }}>None</p>
            }
          </Grid>
        </Paper>
      </Paper>

      <Paper className={classes.projectPaper}>
        <Typography component='h2' variant='h6'>Members</Typography>
        <Paper elevation={0} style={{ backgroundColor: 'lightgray' }}>
          <Grid container className={classes.peoplePaper}>
            {members.length
              ? members.map(contract =>
                  <StudentCard
                    key={contract.contractId} student={contract.student}
                    acceptRequest={null}
                    declineRequest={handleRequest(contract, 'Removed')}
                  />
                )
              : <p style={{ color: 'grey' }}>None</p>
            }
          </Grid>
        </Paper>
      </Paper>
    </React.Fragment>
  );
};
