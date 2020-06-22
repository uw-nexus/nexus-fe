import React from 'react';
import { Link, Typography } from '@material-ui/core';
import { vh } from 'utils';

import { COLORS, FONT } from 'public/static/styles/constants';

export default (): JSX.Element => {
  return (
    <div
      style={{
        minHeight: vh(5),
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="body2" style={{ color: COLORS.GRAY_C4, fontSize: FONT.MISC }}>
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
