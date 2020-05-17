import React, { useState } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { Container, Typography, Box, Grid, IconButton, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { BE_ADDR, FE_ADDR, callApi, redirectPage, vh } from 'utils';
import { FONT, COLORS } from 'public/static/styles/constants';
import MainButton from 'components/MainButton';
import { Student } from 'types';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: theme.spacing(20),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
  heading: {
    padding: theme.spacing(4),
    paddingTop: theme.spacing(2),
  },
  saveBtn: {
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.12)',
    width: '48px',
    height: '48px',
    borderRadius: '48px',
  },

  misc: {
    fontSize: FONT.MISC,
    color: COLORS.GRAY_C4,
  },
  name: {
    fontSize: FONT.HEADING,
  },
  interests: {
    fontSize: '.875rem',
    color: COLORS.GRAY_75,
  },
  bio: {
    fontSize: '.875rem',
  },

  skills: {
    color: COLORS.GRAY_C4,
    marginBottom: theme.spacing(7),
    '& *': {
      fontSize: '.875rem',
    },
  },
  skillsItem: {
    backgroundColor: COLORS.BG_GRAY,
    borderRadius: '5px',
    color: COLORS.GRAY_75,
    fontSize: '.875rem',
  },

  detailsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingRight: theme.spacing(5),
    marginBottom: theme.spacing(7),
  },
  detailsItem: {
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginRight: '5%',
  },
  detailsIcon: {
    float: 'left',
    marginRight: theme.spacing(1.5),
  },
  detailsText: {
    color: COLORS.GRAY_75,
    fontSize: FONT.MISC,
  },

  actionContainer: {
    position: 'fixed',
    bottom: 0,
    height: vh(15),
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
  },
}));

type PageProps = {
  student?: Student;
  username: string;
  saved: boolean;
};

const StudentPage: NextPage<PageProps> = ({ student, username, saved }) => {
  const classes = useStyles();
  const [saveStatus, setSaveStatus] = useState(saved);
  const data = student.profile;

  const handleInvite = (event): void => {
    event.preventDefault();
  };

  const handleToggleSave = async (event): Promise<void> => {
    event.preventDefault();
    const res = await fetch(`${BE_ADDR}/saved/students/${username}`, {
      method: saveStatus ? 'DELETE' : 'POST',
      credentials: 'include',
    });

    if (res.ok) setSaveStatus(!saveStatus);
  };

  return (
    <>
      <Container maxWidth="xs" disableGutters>
        <Grid container className={classes.heading}>
          <Grid item xs={2}>
            <IconButton style={{ padding: 0, marginLeft: '-10px' }} onClick={(): void => Router.back()}>
              <img src="/static/assets/back.svg" alt="back" />
            </IconButton>
          </Grid>
          <Grid item xs={8}></Grid>
          <Grid item xs={2} style={{ textAlign: 'right' }}>
            <IconButton className={classes.saveBtn} onClick={handleToggleSave}>
              <img src={`/static/assets/${saveStatus ? 'saved.svg' : 'not_saved.svg'}`} alt="toggle save" />
            </IconButton>
          </Grid>
        </Grid>
      </Container>

      <Container component="main" maxWidth="xs" className={classes.content}>
        <Typography className={classes.name}>{`${data.firstName} ${data.lastName}`}</Typography>
        <Typography>{student.roles.join(' / ')}</Typography>
        <Typography className={classes.interests}>
          {student.interests.length ? `Interests: ${student.interests.join(', ')}` : ''}
        </Typography>

        <Box marginY="2rem">
          <Typography className={classes.bio}>
            {data.bio || <span style={{ color: COLORS.GRAY_75 }}>{'No bio'}</span>}
          </Typography>
        </Box>

        <Box className={classes.skills}>
          <Box marginBottom=".4rem">
            <Typography>
              {`Skills / Tools:`}
              {student.skills.length ? '' : ' N/A'}
            </Typography>
          </Box>
          <Grid container spacing={3} justify="flex-start" alignItems="flex-start">
            {student.skills.map((s) => (
              <Grid item key={s}>
                <Chip label={s} className={classes.skillsItem} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box className={classes.detailsContainer}>
          <Box className={classes.detailsItem} display={`${data.degree ? 'flex' : 'none'}`}>
            <img
              className={classes.detailsIcon}
              style={{ marginBottom: '1px' }}
              src="/static/assets/degree.svg"
              alt="degree"
            />
            <Typography className={classes.detailsText}>{data.degree}</Typography>
          </Box>
          <Box className={classes.detailsItem} display={`${data.major1 ? 'flex' : 'none'}`}>
            <img className={classes.detailsIcon} src="/static/assets/major.svg" alt="major" />
            <Typography className={classes.detailsText}>{data.major1}</Typography>
          </Box>
          <Box className={classes.detailsItem} display={`${data.major2 ? 'flex' : 'none'}`}>
            <img className={classes.detailsIcon} src="/static/assets/major.svg" alt="major" />
            <Typography className={classes.detailsText}>{data.major2}</Typography>
          </Box>
          <Box className={classes.detailsItem} display={`${data.postal ? 'flex' : 'none'}`}>
            <img className={classes.detailsIcon} src="/static/assets/postal.svg" alt="postal" />
            <Typography className={classes.detailsText}>{data.postal}</Typography>
          </Box>
        </Box>
      </Container>

      <Box className={classes.actionContainer}>
        <Container maxWidth="xs" disableGutters>
          <Box paddingX="20%">
            <MainButton label="Invite to Project" onClick={handleInvite} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

StudentPage.getInitialProps = async (ctx): Promise<PageProps> => {
  try {
    const { username } = ctx.query;
    const student = await callApi(ctx, `${FE_ADDR}/api/student/${username}`);
    const allSaved = await callApi(ctx, `${BE_ADDR}/saved`);
    const saved = allSaved.students.includes(username as string);
    return { student, username: username as string, saved };
  } catch (error) {
    redirectPage(ctx, '/login');
  }
};

export default StudentPage;
