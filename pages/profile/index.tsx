import React from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { Container, Typography, Box, Grid, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SideNav from 'components/SideNav';
import { FE_ADDR, callApi, redirectPage, vh } from 'utils';
import { FONT, COLORS } from 'public/static/styles/constants';
import MainButton from 'components/MainButton';
import { Student } from 'types';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: theme.spacing(20),
  },
  contentHeader: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
  heading: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  title: {
    fontSize: FONT.HEADING,
    color: theme.palette.text.primary,
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
    marginTop: '2rem',
    marginBottom: theme.spacing(7),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
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
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(10),
    marginBottom: theme.spacing(7),
  },
  detailsItem: {
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginRight: '5%',
  },
  detailsText: {
    color: COLORS.GRAY_75,
    fontSize: FONT.MISC,
  },

  linksContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
  links: {
    fontSize: '.875rem',
    '& > a': {
      textDecoration: 'none',
      color: 'inherit',
    },
  },

  icon: {
    float: 'left',
    marginRight: theme.spacing(1.5),
  },

  actionContainer: {
    position: 'fixed',
    bottom: 0,
    height: vh(15),
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTop: `1px solid ${COLORS.GRAY_DA}`,
  },
}));

type PageProps = {
  student: Student;
};

const MyProfilePage: NextPage<PageProps> = ({ student }) => {
  const classes = useStyles();
  const data = student.profile;

  const handleStartEdit = async (event): Promise<void> => {
    event.preventDefault();
    sessionStorage.setItem('profile', JSON.stringify(student));
    Router.push(`/profile/edit`);
  };

  return (
    <>
      <Container maxWidth="md" disableGutters>
        <Grid container className={classes.heading}>
          <Grid item xs={2}>
            <SideNav iconStyle={{ padding: 0, marginLeft: '.5rem' }} />
          </Grid>
          <Grid item xs={8}>
            <Box display="flex" justifyContent="space-evenly" alignItems="center" height="100%">
              <Typography align="center" className={classes.title}>
                {'My Profile'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Container component="main" maxWidth="md" className={classes.content} disableGutters>
        <Box className={classes.contentHeader}>
          <Typography className={classes.name}>{`${data.firstName} ${data.lastName}`}</Typography>
          <Typography>{student.roles.join(' / ')}</Typography>
          <Typography className={classes.interests}>
            {student.interests.length ? `Interests: ${student.interests.join(', ')}` : ''}
          </Typography>
          <Box marginTop="2rem" marginBottom="1rem">
            <Typography className={classes.bio}>
              {data.bio || <span style={{ color: COLORS.GRAY_75 }}>{'No bio'}</span>}
            </Typography>
          </Box>
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
              className={classes.icon}
              style={{ marginBottom: '1px' }}
              src="/static/assets/degree.svg"
              alt="degree"
            />
            <Typography className={classes.detailsText}>{data.degree}</Typography>
          </Box>
          <Box className={classes.detailsItem} display={`${data.major1 ? 'flex' : 'none'}`}>
            <img className={classes.icon} src="/static/assets/major.svg" alt="major" />
            <Typography className={classes.detailsText}>{data.major1}</Typography>
          </Box>
          <Box className={classes.detailsItem} display={`${data.major2 ? 'flex' : 'none'}`}>
            <img className={classes.icon} src="/static/assets/major.svg" alt="major" />
            <Typography className={classes.detailsText}>{data.major2}</Typography>
          </Box>
          <Box className={classes.detailsItem} display={`${data.postal ? 'flex' : 'none'}`}>
            <img className={classes.icon} src="/static/assets/postal.svg" alt="postal" />
            <Typography className={classes.detailsText}>{data.postal}</Typography>
          </Box>
        </Box>

        {data.linkedin || data.website ? (
          <Box className={classes.linksContainer}>
            <Box marginY=".2rem">
              <Typography className={classes.links} style={{ color: COLORS.GRAY_75 }}>
                {`Personal Links`}
              </Typography>
            </Box>

            {data.linkedin ? (
              <Box marginY=".2rem">
                <img className={classes.icon} src="/static/assets/linkedin.svg" alt="linkedin" />
                <Typography className={classes.links}>
                  <a href={`//${data.linkedin}`}>{data.linkedin}</a>
                </Typography>
              </Box>
            ) : null}

            {data.website ? (
              <Box marginY=".2rem">
                <img className={classes.icon} src="/static/assets/website.svg" alt="website" />
                <Typography className={classes.links}>
                  <a href={`//${data.website}`}>{data.website}</a>
                </Typography>
              </Box>
            ) : null}
          </Box>
        ) : null}
      </Container>

      <Box className={classes.actionContainer}>
        <Container maxWidth="md" disableGutters>
          <Box paddingX="20%">
            <MainButton label={`Edit`} onClick={handleStartEdit} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

MyProfilePage.getInitialProps = async (ctx): Promise<PageProps> => {
  try {
    const student = await callApi(ctx, `${FE_ADDR}/api/profile`);
    return { student };
  } catch (error) {
    redirectPage(ctx, '/login');
  }
};

export default MyProfilePage;
