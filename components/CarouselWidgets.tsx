import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  btnWrapper: {
    position: 'absolute',
    width: '100%',
    zIndex: 100,
    bottom: 0,
    textAlign: 'center',
  },
  btn: {
    width: '30px',
    height: '30px',
    cursor: 'pointer',
    userSelect: 'none',
    position: 'absolute',
    bottom: 0,
    padding: 0,
  },
  btnText: {
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    fontSize: theme.spacing(2.5),
  },
  indicators: {
    position: 'absolute',
    width: '100%',
    zIndex: 100,
    bottom: 0,
    textAlign: 'center',
  },
}));

export const Buttons = ({ index, total, loop, prevHandler, nextHandler }): JSX.Element => {
  const classes = useStyles();

  return (
    <Box className={classes.btnWrapper}>
      {(loop || index !== 0) && (
        <Button disableRipple onClick={prevHandler} className={classes.btn} style={{ left: '2rem' }}>
          <Typography className={classes.btnText} style={{ color: '#BBBBBB' }}>
            Back
          </Typography>
        </Button>
      )}
      {(loop || index !== total - 1) && (
        <Button disableRipple onClick={nextHandler} className={classes.btn} style={{ right: '2rem' }}>
          <Typography className={classes.btnText}>Next</Typography>
        </Button>
      )}
    </Box>
  );
};

const Dot = ({ selected }): JSX.Element => (
  <span
    style={{
      display: 'inline-block',
      height: '8px',
      width: '8px',
      borderRadius: '4px',
      backgroundColor: selected ? '#F05A28' : '#DADADA',
      margin: '.5rem',
      transitionDuration: '300ms',
    }}
  />
);

export const IndicatorDots = ({ total, index }): JSX.Element => {
  const classes = useStyles();

  if (total < 2) {
    return <Box className={classes.indicators} />;
  } else {
    return (
      <Box className={classes.indicators}>
        {[...Array(total)].map((_, i) => {
          return <Dot key={i} selected={index === i} />;
        })}
      </Box>
    );
  }
};
