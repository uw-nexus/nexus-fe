import React, { useState } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 're-carousel';

import { Buttons, IndicatorDots } from 'components/CarouselWidgets';
import EduPage from 'components/signup/EduPage';
import SkillsPage from 'components/signup/SkillsPage';
import RolesPage from 'components/signup/RolesPage';
import InterestsPage from 'components/signup/InterestsPage';
import LinksPage from 'components/signup/LinksPage';
import { BE_ADDR } from 'utils';

const useStyles = makeStyles(() => ({
  outer: {
    height: '95vh',
    marginTop: '5vh',
    marginBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

const SetupEduPage: NextPage = () => {
  const classes = useStyles();

  const [student, setStudent] = useState({
    profile: {
      school: '',
      degree: '',
      major1: '',
      major2: '',
      resume: '',
      linkedin: '',
      website: '',
    },
    skills: [],
    roles: [],
    interests: [],
  });

  const handleStringData = (field) => (event): void => {
    setStudent({
      ...student,
      profile: {
        ...student.profile,
        [field]: event.target.value,
      },
    });
  };

  const saveStudent = async (event): Promise<void> => {
    event.preventDefault();
    await fetch(`${BE_ADDR}/students`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(student),
    });
    Router.push('/');
  };

  return (
    <Container className={classes.outer}>
      <Carousel widgets={[IndicatorDots, Buttons]} style={{ height: '85vh' }}>
        <EduPage student={student} handleChange={handleStringData} />
        <SkillsPage student={student} />
        <RolesPage student={student} />
        <InterestsPage student={student} />
        <LinksPage handleChange={handleStringData} saveStudent={saveStudent} />
      </Carousel>
    </Container>
  );
};

export default SetupEduPage;
