import React from 'react';
import { useAppSelector } from 'hooks/hooks';
import { useLocation, Navigate } from 'react-router-dom';
import { authUser } from 'store/slices/userSlice';
import { isExpired } from 'react-jwt';

type Props = { Component: JSX.Element };

export const CheckRedirect: React.FC<Props> = ({ Component }) => {
  const { isAuth, token } = useAppSelector(authUser);
  const { pathname } = useLocation();

  if ((isAuth || !isExpired(token!)) && (pathname === '/signin' || pathname === '/signup'))
    return <Navigate to="/main" />;

  if ((!isAuth || isExpired(token!)) && (pathname.includes('/main') || pathname === '/profile'))
    return <Navigate to="/" />;

  return Component;
};
