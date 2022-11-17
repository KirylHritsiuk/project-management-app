import { LinearProgress } from '@mui/material';
import { useAppSelector } from 'hooks/hooks';
import { lazy, Suspense } from 'react';

import { Navigate } from 'react-router-dom';
import styled from './Main.module.scss';

const List = lazy(() => import('../../components/BoardList/BoardList'));

export function Main() {
  const { isAuth } = useAppSelector((state) => state.user);

  return isAuth ? (
    <main className={styled.main}>
      <Suspense fallback={<LinearProgress />}>
        <List />
      </Suspense>
    </main>
  ) : (
    <Navigate to={'/'} />
  );
}
