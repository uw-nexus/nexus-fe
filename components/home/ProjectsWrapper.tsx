import React, { useState, useRef, useReducer } from 'react';
import { Box, Typography } from '@material-ui/core';
import ProjectCard from 'components/ProjectCard';

import { useFetch, useInfiniteScroll } from 'utils/hooks';
import { FE_ADDR, vh } from 'utils';

export default ({ projects, setProjects, savedProjects, authenticated, filters }): JSX.Element => {
  const pageReducer = (state, action): unknown => {
    switch (action.type) {
      case 'ADVANCE_PAGE':
        return { ...state, page: state.page + 1 };
      default:
        return state;
    }
  };

  const bottomBoundaryRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [pager, pagerDispatch] = useReducer(pageReducer, { page: 1 });
  useFetch(`${FE_ADDR}/api/algolia/search-projects`, filters, pager, projects, setProjects, setLoading);
  useInfiniteScroll(bottomBoundaryRef, pagerDispatch);

  const items = projects.map((p) => (
    <ProjectCard
      {...p}
      key={p.details.projectId}
      allowSave={authenticated}
      saved={savedProjects.includes(p.details.projectId)}
    />
  ));

  return (
    <>
      <Box>
        {projects.length === 0 && !loading ? (
          <Box minHeight={vh(70)} display="flex" justifyContent="center" alignItems="center">
            <Typography color="textSecondary">{'No results found'}</Typography>
          </Box>
        ) : null}
        {items}
        {loading ? 'LOADING' : null}
      </Box>
      <div id="projects-bottom-boundary" ref={bottomBoundaryRef} />
    </>
  );
};
