import React from 'react';
import Link from 'next/link';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  button: {
    border: '2px solid #F05A28',
    borderRadius: '10px',
    width: '100%',
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    fontSize: theme.spacing(5),
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: 'white',
    },
  },
}));

export default ({ type = 'button', href = '', label }): JSX.Element => {
  const classes = useStyles();

  if (type === 'submit')
    return (
      <Button type={type as 'submit' | 'reset' | 'button'} className={classes.button} aria-label={label} size="large">
        {label}
      </Button>
    );
  else
    return (
      <Link href={href}>
        <Button className={classes.button} aria-label={label} size="large">
          {label}
        </Button>
      </Link>
    );
};
