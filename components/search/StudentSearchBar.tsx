import React, { useState } from 'react';
import SearchBar from './SearchBar';
import { BE_ADDR } from 'utils';

export default ({ setStudents }): JSX.Element => {
  const [name, setName] = useState('');
  const [focus, setFocus] = useState(false);

  const handleSearch = async (event): Promise<void> => {
    event.preventDefault();
    const res = await fetch(`${BE_ADDR}/search/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        filters: {
          profile: {
            firstName: name,
          },
        },
      }),
    });

    if (res.ok) {
      const students = await res.json();
      setStudents(students);
    }
  };

  return <SearchBar entity="student" text={name} setText={setName} {...{ focus, setFocus, handleSearch }} />;
};
