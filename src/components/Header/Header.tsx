import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import { LangBtn } from './LangBtn/LangBtn';
import { NavBar } from './NavBar/NavBar';
import { AuthNavBar } from './AuthNavBar/AuthNavBar';
import { ElevationScroll } from './ElevationScroll/ElevationScroll';

import './Header.scss';
import { useAppSelector } from '../../hooks/hooks';
import { authUser } from '../../store/slices/userSlice';

export const Header: React.FC = () => {
  const { isAuth } = useAppSelector(authUser);

  return (
    <ElevationScroll>
      <AppBar component="header" color="default" position="sticky">
        <Container className="header" component={Toolbar}>
          <Typography variant="h1" component={Link} to="/" className="header__logo">
            PMA
          </Typography>
          {isAuth ? <AuthNavBar /> : <NavBar />}
          <LangBtn />
        </Container>
      </AppBar>
    </ElevationScroll>
  );
};
