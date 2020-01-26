import React from 'react';
import { Link, Typography } from '@material-ui/core';

export default () => {
  return (
    <div
      style={{
        minHeight: '4rem',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Typography
        variant='body2'
        color='textSecondary'
        style={{ fontWeight: 'bold' }}
      >
        {'Copyright © '}
        <Link color='inherit' href='https://www.facebook.com/uw.nexus'>
          NEXUS
        </Link>
        {' '}{new Date().getFullYear()}{'.'}
      </Typography>
    </div>
  );
};
