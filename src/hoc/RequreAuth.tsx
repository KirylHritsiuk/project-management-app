import { useAppSelector } from 'hooks/hooks';
import { FC } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

interface RequiredAuthProp {
  children: JSX.Element;
}

export const RequiredAuth: FC<RequiredAuthProp> = ({ children }) => {
  const location = useLocation();
  const { isAuth } = useAppSelector((state) => state.user);

  if (isAuth) {
    return children;
  }

  return <Navigate to="/" state={{ from: location.pathname }} />;
};
