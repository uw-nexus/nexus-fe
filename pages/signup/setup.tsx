import React, { useState } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { Container, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 're-carousel';

import { Buttons, IndicatorDots } from 'components/CarouselWidgets';
import BioPage from 'components/signup/BioPage';
import EduPage from 'components/signup/EduPage';
import SkillsPage from 'components/signup/SkillsPage';
import RolesPage from 'components/signup/RolesPage';
import InterestsPage from 'components/signup/InterestsPage';
import LinksPage from 'components/signup/LinksPage';
import { BE_ADDR, vh, callApi, redirectPage } from 'utils';

const useStyles = makeStyles(() => ({
  outer: {
    height: vh(95),
    marginTop: vh(5),
    marginBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

type PageProps = {
  options: {
    degrees: string[];
    schools: string[];
    majors: string[];
    skills: string[];
    roles: string[];
    interests: string[];
  };
};

const SetupPage: NextPage<PageProps> = ({ options }) => {
  const classes = useStyles();

  const [student, setStudent] = useState({
    profile: {
      bio: '',
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

  const handleStringData = (field, value): void => {
    setStudent({
      ...student,
      profile: {
        ...student.profile,
        [field]: value,
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
    <Container className={classes.outer} maxWidth="sm">
      <Box height={vh(85)}>
        <Carousel widgets={[IndicatorDots, Buttons]}>
          <BioPage student={student} handleChange={handleStringData} />
          <EduPage
            student={student}
            handleChange={handleStringData}
            options={{ degrees: options.degrees, schools: options.schools, majors: options.majors }}
          />
          <SkillsPage student={student} options={options.skills} />
          <RolesPage student={student} options={options.roles} />
          <InterestsPage student={student} options={options.interests} />
          <LinksPage handleChange={handleStringData} saveStudent={saveStudent} />
        </Carousel>
      </Box>
    </Container>
  );
};

SetupPage.getInitialProps = async (ctx): Promise<PageProps> => {
  try {
    const options = await callApi(ctx, `${BE_ADDR}/options/students`);
    return { options };
  } catch (error) {
    redirectPage(ctx, '/join');
  }
};

export default SetupPage;
