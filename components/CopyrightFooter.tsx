import React from 'react';
import { Link, Typography } from '@material-ui/core';

export default (): JSX.Element => {
  return (
    <div
      style={{
        minHeight: '5vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="body2" style={{ color: '#C4C4C4', fontSize: '.75rem' }}>
        {'Copyright © '}
        <Link color="inherit" href="https://www.facebook.com/uw.nexus">
          NEXUS UW
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </div>
  );
};
