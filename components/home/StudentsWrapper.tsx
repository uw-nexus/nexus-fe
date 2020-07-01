import React, { useState, useRef, useReducer } from 'react';
import { Box, Typography } from '@material-ui/core';
import StudentCard from 'components/StudentCard';

import { useFetch, useInfiniteScroll } from 'utils/hooks';
import { FE_ADDR, vh } from 'utils';

export default ({ students, setStudents, savedStudents, authenticated, filters }): JSX.Element => {
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
  useFetch(`${FE_ADDR}/api/algolia/search-students`, filters, pager, students, setStudents, setLoading);
  useInfiniteScroll(bottomBoundaryRef, pagerDispatch);

  const items = students.map((s) => (
    <StudentCard
      {...s}
      key={s.profile.user.username}
      allowSave={authenticated}
      saved={savedStudents.includes(s.profile.user.username)}
    />
  ));

  return (
    <>
      <Box>
        {students.length === 0 && !loading ? (
          <Box minHeight={vh(70)} display="flex" justifyContent="center" alignItems="center">
            <Typography color="textSecondary">{'No results found'}</Typography>
          </Box>
        ) : null}
        {items}
        {loading ? 'LOADING' : null}
      </Box>
      <div id="students-bottom-boundary" ref={bottomBoundaryRef} />
    </>
  );
};
