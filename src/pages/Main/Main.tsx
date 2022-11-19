import { LinearProgress } from '@mui/material';
import BoardList from 'components/BoardList/BoardList';
import { useAppSelector } from 'hooks/hooks';
import { lazy, Suspense } from 'react';

import { Navigate } from 'react-router-dom';
import styled from './Main.module.scss';

export function Main() {
  const { isAuth } = useAppSelector((state) => state.user);

  return isAuth ? (
    <main className={styled.main}>
      <BoardList />
    </main>
  ) : (
    <Navigate to={'/'} />
  );
}
