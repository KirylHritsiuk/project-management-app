import React from 'react';
import { useAppSelector } from 'hooks/hooks';
import { useLocation, Navigate } from 'react-router-dom';
import { authUser } from 'store/slices/userSlice';
import { isExpired } from 'react-jwt';
import { main } from 'store/slices/mainSlice';

type Props = { Component: JSX.Element };

export const CheckRedirect: React.FC<Props> = ({ Component }) => {
  const { isAuth, token } = useAppSelector(authUser);
  const { searchInput } = useAppSelector(main);
  const { pathname } = useLocation();

  if ((isAuth || !isExpired(token!)) && (pathname === '/signin' || pathname === '/signup'))
    return <Navigate to="/main" />;

  if (
    (!isAuth || isExpired(token!)) &&
    (pathname.includes('/main') || pathname === '/profile' || pathname === '/search')
  )
    return <Navigate to="/" />;

  if (!searchInput && pathname === '/search') return <Navigate to="/main" />;

  return Component;
};
