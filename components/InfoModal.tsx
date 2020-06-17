import React, { useState } from 'react';
import { Modal, Fade, Box, IconButton, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FONT, COLORS } from 'public/static/styles/constants';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: theme.spacing(4),
  },
  modalBox: {
    backgroundColor: 'white',
    boxShadow: '0px 12px 48px rgba(0, 0, 0, 0.18)',
    borderRadius: theme.spacing(1),
    color: COLORS.GRAY_75,
    fontSize: FONT.GUIDE,
    padding: '.5rem',
    paddingBottom: '2rem',
  },
}));

export default (): [React.ElementType, React.Dispatch<React.SetStateAction<boolean>>] => {
  const [showModal, setShowModal] = useState(false);

  const InfoModal = ({ text }): JSX.Element => {
    const classes = useStyles();

    return (
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
              <Typography>{text}</Typography>
            </Box>
          </div>
        </Fade>
      </Modal>
    );
  };

  return [InfoModal, setShowModal];
};
