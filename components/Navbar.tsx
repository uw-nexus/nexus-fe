import React, { useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Home, Person, Work } from '@material-ui/icons';

const Navbar: NextPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(router.pathname);

  if (page.startsWith('/login') || page.startsWith('/signup')) return null;

  return (
    <BottomNavigation
      value={page}
      showLabels
      style={{
        height: '4rem',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        boxShadow: '0 -1px 3px rgba(0,0,0,0.2)',
        zIndex: 10,
      }}
      onChange={(_, dest): void => {
        setPage(dest);
        router.push(dest);
      }}
    >
      <BottomNavigationAction label="Home" icon={<Home />} value="/" />
      <BottomNavigationAction label="My Projects" icon={<Work />} value="/myprojects" />
      <BottomNavigationAction label="Profile" icon={<Person />} value="/profile" />
    </BottomNavigation>
  );
};

export default (Child): NextPage => {
  const HOC: NextPage = (props) => (
    <>
      <Child {...props} />
      <Navbar />
    </>
  );

  HOC.getInitialProps = async (ctx): Promise<unknown> => (Child.getInitialProps ? Child.getInitialProps(ctx) : {});
  return HOC;
};
