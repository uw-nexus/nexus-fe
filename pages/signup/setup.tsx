import React, { useState } from 'react';
import { NextPage } from 'next';
import Router from 'next/router';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from 're-carousel';

import { Buttons, IndicatorDots } from 'components/CarouselWidgets';
import EduPage from 'components/signup/EduPage';
import SkillsPage from 'components/signup/SkillsPage';
import PositionsPage from 'components/signup/PositionsPage';
import InterestsPage from 'components/signup/InterestsPage';
import LinksPage from 'components/signup/LinksPage';
import { BE_ADDR, checkAuth, redirectPage } from 'utils';

const useStyles = makeStyles(() => ({
  outer: {
    minHeight: 'calc(100% - 6rem)',
    height: 'calc(100% - 6rem)',
    marginTop: '4rem',
    padding: 0,
  },
}));

const SetupEduPage: NextPage = () => {
  const classes = useStyles();

  const [profile, setProfile] = useState({
    data: {
      school: '',
      standing: '',
      major1: '',
      major2: '',
      resume: '',
      linkedin: '',
      website: '',
    },
    skills: [],
    positions: [],
    interests: [],
  });

  const handleStringData = (field) => (event): void => {
    setProfile({
      ...profile,
      data: {
        ...profile.data,
        [field]: event.target.value,
      },
    });
  };

  const saveProfile = async (event): Promise<void> => {
    event.preventDefault();

    await fetch(`${BE_ADDR}/students`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ profile }),
    });

    Router.push('/');
  };

  return (
    <Container className={classes.outer}>
      <Carousel widgets={[IndicatorDots, Buttons]} style={{ height: '100%' }}>
        <EduPage profile={profile} handleChange={handleStringData} />
        <SkillsPage profile={profile} />
        <PositionsPage profile={profile} />
        <InterestsPage profile={profile} />
        <LinksPage handleChange={handleStringData} saveProfile={saveProfile} />
      </Carousel>
    </Container>
  );
};

SetupEduPage.getInitialProps = async (ctx): Promise<{ authenticated: boolean }> => {
  const { authenticated } = await checkAuth(ctx);
  if (authenticated) redirectPage(ctx, '/');
  return { authenticated };
};

export default SetupEduPage;
