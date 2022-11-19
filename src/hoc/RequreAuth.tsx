import { useAppSelector } from 'hooks/hooks';
import { FC, PropsWithChildren, ReactChild, ReactNode } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

export const RequiredAuth: FC<ReactChild> = ({ children }) => {
  const location = useLocation();
  const { isAuth } = useAppSelector((state) => state.user);

  if (isAuth) {
    return children;
  }

  return <Navigate to="/" state={{ from: location.pathname }} />;
};
