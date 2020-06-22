import React, { useState } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { Container, Box, Grid, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ProjectContent from 'components/project/ProjectContent';
import MainButton from 'components/MainButton';
import SideNav from 'components/SideNav';
import useModal from 'components/InfoModal';
import { BE_ADDR, FE_ADDR, callApi, redirectPage, vh } from 'utils';
import { COLORS } from 'public/static/styles/constants';
import { Project, Contract } from 'types';

const useStyles = makeStyles((theme) => ({
  heading: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  saveBtn: {
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.12)',
    width: '48px',
    height: '48px',
    borderRadius: '48px',
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
  project?: Project;
  projectId: string;
  contracts: Contract[];
  isOwner: boolean;
  isConnected: boolean;
  saved: boolean;
};

const ProjectPage: NextPage<PageProps> = ({ project, projectId, saved, isConnected, isOwner }) => {
  const classes = useStyles();
  const [saveStatus, setSaveStatus] = useState(saved);
  const [connected, setConnected] = useState(isConnected);
  const [InfoModal, setShowModal] = useModal();

  const handleJoinRequest = async (event): Promise<void> => {
    event.preventDefault();
    const res = await fetch(`${FE_ADDR}/api/connect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ projectId }),
    });
    if (res.ok) {
      setShowModal(true);
      setConnected(true);
    }
  };

  const handleStartEdit = async (event): Promise<void> => {
    event.preventDefault();
    sessionStorage.setItem('projectEdit', JSON.stringify(project));
    Router.push(`/project/${projectId}/edit`);
  };

  const handleToggleSave = async (event): Promise<void> => {
    event.preventDefault();
    const res = await fetch(`${BE_ADDR}/saved/projects/${projectId}`, {
      method: saveStatus ? 'DELETE' : 'POST',
      credentials: 'include',
    });

    if (res.ok) setSaveStatus(!saveStatus);
  };

  return (
    <>
      <Container maxWidth="md" disableGutters>
        <Grid container className={classes.heading}>
          <Grid item xs={2}>
            <SideNav iconStyle={{ padding: 0, marginLeft: '.5rem' }} />
          </Grid>
          <Grid item xs={8}></Grid>
          <Grid item xs={2} style={{ textAlign: 'right' }}>
            <IconButton className={classes.saveBtn} onClick={handleToggleSave}>
              <img src={`/static/assets/${saveStatus ? 'saved.svg' : 'not_saved.svg'}`} alt="toggle save" />
            </IconButton>
          </Grid>
        </Grid>
      </Container>

      <Container component="main" maxWidth="md" disableGutters>
        <ProjectContent project={project} />
      </Container>

      <Box className={classes.actionContainer}>
        <Container maxWidth="md" disableGutters>
          <Box paddingX="20%">
            {isOwner ? (
              <MainButton label={`Edit`} onClick={handleStartEdit} />
            ) : (
              <>
                <MainButton
                  label={connected ? `Connected` : `Get Connected`}
                  onClick={handleJoinRequest}
                  disabled={connected}
                />
                <InfoModal
                  text={`Your email has been shared with the project manager. He/she will contact you if they think you are a good fit!`}
                />
              </>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

ProjectPage.getInitialProps = async (ctx): Promise<PageProps> => {
  try {
    const { pid } = ctx.query;
    const props: PageProps = await callApi(ctx, `${FE_ADDR}/api/project/${pid}`);
    const saved = await callApi(ctx, `${BE_ADDR}/saved`);
    props.saved = saved.projects.includes(parseInt(pid as string));
    return props;
  } catch (error) {
    redirectPage(ctx, '/login');
  }
};

export default ProjectPage;
