import { LinearProgress } from '@mui/material';
import { BoardList } from 'components';
import { useAppSelector } from 'hooks/hooks';
import { lazy, Suspense } from 'react';

import { Navigate } from 'react-router-dom';
import styled from './Main.module.scss';

export function Main() {
  return (
    <main className={styled.main}>
      <BoardList />
    </main>
  );
}
