import React from 'react';
import { InputBase, Button, InputAdornment, IconButton } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Cancel } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { COLORS, FONT } from 'public/static/styles/constants';

const useStyles = makeStyles((theme) => ({
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.BG_GRAY,
    borderRadius: '10px',
    paddingTop: theme.spacing(1.75),
    paddingBottom: theme.spacing(1.75),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    marginRight: theme.spacing(4),
    '& > *': {
      width: '100%',
    },
  },
  filter: {
    border: `1px solid ${COLORS.GRAY_DA}`,
    borderRadius: '10px',
    paddingTop: theme.spacing(1.75),
    paddingBottom: theme.spacing(1.75),
  },
  cancel: {
    fontSize: FONT.LABEL,
  },
}));

export default ({ entity, text, setText, focus, setFocus, handleSearch }): JSX.Element => {
  const classes = useStyles();
  return (
    <>
      <Box marginTop=".75rem" paddingX="1rem" display="flex">
        <form className={classes.searchBar} onSubmit={handleSearch}>
          <InputBase
            id={`${entity}-search`}
            placeholder="Search"
            value={text}
            onChange={(e): void => setText(e.target.value)}
            onFocus={(): void => setFocus(true)}
            startAdornment={
              <InputAdornment position="start">
                <img src="/static/assets/search.svg" alt="search" />
              </InputAdornment>
            }
            endAdornment={
              focus && text ? (
                <InputAdornment position="end">
                  <IconButton
                    onClick={(): void => {
                      setText('');
                      document.getElementById(`${entity}-search`).focus();
                    }}
                    style={{ padding: 0, color: COLORS.GRAY_C4 }}
                  >
                    <Cancel />
                  </IconButton>
                </InputAdornment>
              ) : null
            }
          />
        </form>

        {focus ? (
          <Button aria-label="Cancel" className={classes.cancel} onClick={(): void => setFocus(false)}>
            Cancel
          </Button>
        ) : (
          <IconButton aria-label="Filter" disableRipple className={classes.filter}>
            <img src="/static/assets/filter.svg" alt="filter" />
          </IconButton>
        )}
      </Box>
    </>
  );
};
