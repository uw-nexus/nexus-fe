import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Home, Person, Work } from '@material-ui/icons';

const Navbar = () => {
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
        boxShadow: '0 -1px 3px rgba(0,0,0,0.2)'
      }}
      onChange={(_, dest) => {
        setPage(dest);
        router.push(dest);
      }}
    >
      <BottomNavigationAction label='Home' icon={<Home />} value='/' />
      <BottomNavigationAction label='Projects' icon={<Work />} value='/projects' />
      <BottomNavigationAction label='Profile' icon={<Person />} value='/profile' />
    </BottomNavigation>
  );
};

export default (Child) => {
  return class HOC extends React.Component {
    static getInitialProps(ctx) {
      return Child.getInitialProps(ctx);
    }

    render() {
      return (
        <>
          <Child {...this.props} />
          <Navbar />
        </>
      );
    }
  }
};
