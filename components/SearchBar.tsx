import React, { useState } from 'react';
import { InputBase, Button, InputAdornment, IconButton } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Cancel } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { COLORS, FONT } from 'public/static/styles/constants';
import { searchProjects, searchStudents } from 'utils/search';
import { ProjectsFilter, StudentsFilter } from 'types';

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
    '&:hover': {
      boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.16)',
    },
  },
  searchFocused: {
    boxShadow: '0px 0px 16px rgba(0, 0, 0, 0.16)',
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

export default ({ mode, setProjects, setStudents, filterConfig }): JSX.Element => {
  const classes = useStyles();

  const [text, setText] = useState(filterConfig.filters.query);
  const [focus, setFocus] = useState(false);

  const handleSearch = async (event): Promise<void> => {
    event.preventDefault();

    const f = filterConfig.filters;
    const filters: ProjectsFilter | StudentsFilter = {
      query: text,
      teamSize: f.teamSize,
      duration: f.duration,
      degree: f.degree,
      skills: f.skills,
      roles: f.roles,
      interests: f.interests,
    };

    if (mode === 'projects') {
      const projects = await searchProjects(filters as ProjectsFilter);
      setProjects(projects);
    } else {
      const students = await searchStudents(filters as StudentsFilter);
      setStudents(students);
    }
  };

  return (
    <>
      <Box marginTop=".75rem" paddingX="1rem" display="flex">
        <form className={`${classes.searchBar} ${focus ? classes.searchFocused : ''}`} onSubmit={handleSearch}>
          <InputBase
            id={`${mode}-search`}
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
                      document.getElementById(`${mode}-search`).focus();
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
          <IconButton
            aria-label="Filter"
            disableRipple
            className={classes.filter}
            href={`/filters/${mode}?mode=${mode}${text ? `&query=${text}` : ''}${filterConfig.urlParams}`}
          >
            <img src="/static/assets/filter.svg" alt="filter" />
          </IconButton>
        )}
      </Box>
    </>
  );
};
