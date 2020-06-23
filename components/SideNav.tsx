import React, { useState } from 'react';
import Router from 'next/router';
import { Box, Button, Drawer, IconButton, Typography } from '@material-ui/core';
import { List, ListItem, ListItemIcon, ListItemText, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { COLORS, FONT } from 'public/static/styles/constants';
import { FE_ADDR } from 'utils';

const useStyles = makeStyles((theme) => ({
  nav: {
    height: '100%',
    width: '13rem',
    backgroundColor: '#F6F6F8',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  active: {
    color: theme.palette.primary.main,
  },
  inactive: {
    color: COLORS.GRAY_75,
  },
  signOut: {
    color: COLORS.GRAY_75,
    fontSize: FONT.LABEL,
  },
  copyright: {
    color: COLORS.GRAY_C4,
    fontSize: FONT.MISC,
    marginTop: '1rem',
    marginBottom: '.5rem',
  },
}));

const NavItem = ({ imgSrc, imgAlt, text, href = '#' }): JSX.Element => {
  const classes = useStyles();
  const isActive = Router.pathname === href;

  return (
    <Link href={href} underline="none">
      <ListItem button className={isActive ? classes.active : classes.inactive}>
        <ListItemIcon>
          <IconButton>
            <img src={`/static/assets/${imgSrc}${isActive ? '_active' : ''}.svg`} alt={imgAlt} />
          </IconButton>
        </ListItemIcon>
        <ListItemText
          primary={text}
          className={isActive ? classes.active : classes.inactive}
          primaryTypographyProps={{ style: { fontWeight: isActive ? 'bold' : 'normal' } }}
        />
      </ListItem>
    </Link>
  );
};

export default ({ iconStyle = {}, authenticated = true }): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => (event): void => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setOpen(open);
  };

  const handleSignOut = async (event): Promise<void> => {
    event.preventDefault();
    await fetch(`${FE_ADDR}/api/signout`, { credentials: 'include' });
    Router.push('/');
  };

  return (
    <>
      <IconButton onClick={toggleDrawer(true)} style={iconStyle}>
        <img src="/static/assets/menu.svg" alt="menu" />
      </IconButton>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        ModalProps={{
          BackdropProps: { invisible: true },
        }}
      >
        <Box className={classes.nav} role="presentation" onKeyDown={toggleDrawer(false)}>
          {authenticated ? (
            <>
              <Box>
                <Box marginX="25%" marginY="2rem">
                  <img width="100%" src="/static/assets/nexus_logo.png" alt="logo" />
                </Box>
                <List component="nav">
                  <NavItem text="Home" imgSrc="nav_home" imgAlt="home" href="/" />
                  <NavItem text="Notifications" imgSrc="nav_notif" imgAlt="notifications" href="/notifications" />
                  <NavItem text="Profile" imgSrc="nav_profile" imgAlt="profile" href="/profile" />
                  <NavItem text="My Projects" imgSrc="nav_projects" imgAlt="my-projects" href="/my-projects" />
                  <NavItem text="Favorites" imgSrc="nav_fav" imgAlt="favorites" href="/favorites" />
                  <NavItem
                    text="Contact Us"
                    imgSrc="nav_contact"
                    imgAlt="contact-us"
                    href="mailto:uw.nexus@gmail.com"
                  />
                </List>
              </Box>

              <Box marginY="1rem" textAlign="center">
                <Button onClick={handleSignOut} className={classes.signOut}>
                  {`Sign Out`}
                </Button>
                <Typography className={classes.copyright}>
                  {`Copyright © NEXUS UW ${new Date().getFullYear()}`}
                </Typography>
              </Box>
            </>
          ) : (
            <Box height="80%" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <Box marginX="25%" marginY="2rem">
                <img width="100%" src="/static/assets/nexus_logo.png" alt="logo" />
              </Box>
              <Link href="/login" style={{ textDecoration: 'none' }}>
                <Button style={{ fontWeight: 'bold', fontSize: FONT.ACTION_BTN, color: COLORS.PRIMARY }}>
                  {`Sign In`}
                </Button>
              </Link>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
};
