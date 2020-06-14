import React, { useState } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { Container, Box, Grid, IconButton, Modal, Fade, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { BE_ADDR, FE_ADDR, callApi, redirectPage, vh } from 'utils';
import MainButton from 'components/MainButton';
import ProjectContent from 'components/project/ProjectContent';
import { Project, Contract } from 'types';
import { FONT, COLORS } from 'public/static/styles/constants';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: theme.spacing(20),
    '& > *': {
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBox: {
    backgroundColor: 'white',
    boxShadow: '0px 12px 48px rgba(0, 0, 0, 0.18)',
    borderRadius: theme.spacing(1),
    color: COLORS.GRAY_75,
    fontSize: FONT.GUIDE,
    maxWidth: '300px',
    padding: '.5rem',
    paddingBottom: '2rem',
  },
}));

type PageProps = {
  project?: Project;
  projectId: number;
  contracts: Contract[];
  isOwner: boolean;
  isConnected: boolean;
  saved: boolean;
};

const ProjectPage: NextPage<PageProps> = ({ project, projectId, saved, isConnected }) => {
  const classes = useStyles();
  const [saveStatus, setSaveStatus] = useState(saved);
  const [showModal, setShowModal] = useState(false);

  const handleJoinRequest = async (event): Promise<void> => {
    event.preventDefault();
    const res = await fetch(`${FE_ADDR}/api/connect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ projectId }),
    });
    if (res.ok) setShowModal(true);
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

      <Container component="main" maxWidth="xs" disableGutters className={classes.content}>
        <ProjectContent project={project} />
      </Container>

      <Box className={classes.actionContainer}>
        <Container maxWidth="xs" disableGutters>
          <Box paddingX="20%">
            <MainButton
              label={isConnected ? `Connected` : `Get Connected`}
              onClick={handleJoinRequest}
              disabled={isConnected}
            />

            <Modal
              className={classes.modal}
              open={showModal}
              onClose={(): void => setShowModal(false)}
              closeAfterTransition
              BackdropProps={{ invisible: true }}
            >
              <Fade in={showModal}>
                <div className={classes.modalBox}>
                  <Box display="flex" justifyContent="flex-end">
                    <IconButton style={{ padding: '0' }} onClick={(): void => setShowModal(false)}>
                      <img src="/static/assets/modal_exit.svg" alt="modal-exit" />
                    </IconButton>
                  </Box>
                  <Box padding=".5rem">
                    <Typography>
                      {`Your email has been shared with the project manager. He/she will contact you if they think you are a good fit!`}
                    </Typography>
                  </Box>
                </div>
              </Fade>
            </Modal>
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
