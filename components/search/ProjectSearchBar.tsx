import React, { useState } from 'react';
import SearchBar from './SearchBar';
import { BE_ADDR } from 'utils';

export default ({ setProjects }): JSX.Element => {
  const [title, setTitle] = useState('');
  const [focus, setFocus] = useState(false);

  const handleSearch = async (event): Promise<void> => {
    event.preventDefault();
    const res = await fetch(`${BE_ADDR}/search/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        filters: {
          details: { title },
        },
      }),
    });

    if (res.ok) {
      const projects = await res.json();
      setProjects(projects);
    }
  };

  return <SearchBar entity="project" text={title} setText={setTitle} {...{ focus, setFocus, handleSearch }} />;
};
