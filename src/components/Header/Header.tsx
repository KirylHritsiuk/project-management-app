import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import { useAppSelector } from 'hooks/hooks';
import { authUser } from 'store/slices/userSlice';
import { LangBtn } from './LangBtn/LangBtn';
import { NavBar } from './NavBar/NavBar';
import { AuthNavBar } from './AuthNavBar/AuthNavBar';
import './Header.scss';

export const Header: React.FC = () => {
  const { isAuth } = useAppSelector(authUser);

  return (
    <AppBar component="header" color="transparent" position="sticky">
      <Container className="header" component={Toolbar}>
        <Typography variant="h1" component={Link} to="/" className="header__logo">
          PMA
        </Typography>
        {isAuth ? <AuthNavBar /> : <NavBar />}
        <LangBtn />
      </Container>
    </AppBar>
  );
};
