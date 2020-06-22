import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Box, Button } from '@material-ui/core';
import { FONT, COLORS } from 'public/static/styles/constants';
import { vh } from 'utils';

const useStyles = makeStyles(() => ({
  wrapper: {
    position: 'absolute',
    height: vh(10),
    width: '100%',
    zIndex: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: '30px',
    height: '30px',
    cursor: 'pointer',
    userSelect: 'none',
    position: 'absolute',
    padding: 0,
  },
  btnText: {
    fontWeight: 'bold',
    color: COLORS.GRAY_75,
    fontSize: FONT.ACTION_BTN,
  },
  stepsText: {
    fontSize: FONT.ACTION_BTN,
    color: COLORS.GRAY_75,
  },
}));

export const Buttons = ({ index, total, loop, prevHandler, nextHandler }): JSX.Element => {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper}>
      {(loop || index !== 0) && (
        <Button disableRipple onClick={prevHandler} className={classes.btn} style={{ left: '8%' }}>
          <Typography className={classes.btnText} style={{ color: COLORS.GRAY_BB }}>
            Back
          </Typography>
        </Button>
      )}
      {(loop || index !== total - 1) && (
        <Button disableRipple onClick={nextHandler} className={classes.btn} style={{ right: '8%' }}>
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
      height: '10px',
      width: '10px',
      borderRadius: '4px',
      backgroundColor: selected ? '#F05A28' : COLORS.GRAY_DA,
      margin: '.5rem',
      transitionDuration: '300ms',
    }}
  />
);

export const IndicatorDots = ({ total, index }): JSX.Element => {
  const classes = useStyles();

  if (total < 2) {
    return <Box className={classes.wrapper} />;
  } else {
    return (
      <Box className={classes.wrapper}>
        {[...Array(total)].map((_, i) => {
          return <Dot key={i} selected={index === i} />;
        })}
      </Box>
    );
  }
};

export const IndicatorText = ({ total, index }): JSX.Element => {
  const classes = useStyles();
  return (
    <Box className={classes.wrapper}>
      <Typography className={classes.stepsText}>{`Step ${index + 1} of ${total}`}</Typography>
    </Box>
  );
};
