import React from 'react';
import { IconButton } from '@material-ui/core';
import useModal from './InfoModal';

export default ({ text }): JSX.Element => {
  const [InfoModal, setShowModal] = useModal();

  return (
    <>
      <IconButton style={{ padding: 0 }} onClick={(): void => setShowModal(true)}>
        <img src="/static/assets/help.svg" alt="help" />
      </IconButton>
      <InfoModal text={text} />
    </>
  );
};
