import React from 'react';
import Link from 'next/link';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FONT, COLORS } from 'public/static/styles/constants';

const useStyles = makeStyles((theme) => ({
  button: {
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: '10px',
    width: '100%',
    color: theme.palette.primary.main,
    fontSize: FONT.ACTION_BTN,
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
  },
  disabled: {
    border: 'none',
    backgroundColor: COLORS.GRAY_BB,
    color: 'white !important',
  },
}));

export default ({ type = 'button', href = '', label, onClick = null, disabled = false }): JSX.Element => {
  const classes = useStyles();

  if (type === 'submit' || onClick)
    return (
      <Button
        type={type as 'submit' | 'reset' | 'button'}
        className={`${classes.button} ${disabled ? classes.disabled : ''}`}
        aria-label={label}
        size="large"
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </Button>
    );
  else
    return (
      <Link href={href}>
        <Button
          className={`${classes.button} ${disabled ? classes.disabled : ''}`}
          aria-label={label}
          size="large"
          onClick={onClick}
          disabled={disabled}
        >
          {label}
        </Button>
      </Link>
    );
};
