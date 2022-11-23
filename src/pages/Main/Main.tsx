import React from 'react';
import { BoardList } from 'components';
import { Container } from '@mui/material';

import styled from './Main.module.scss';

export function Main() {
  return (
    <Container component="main" className={styled.main}>
      <BoardList />
    </Container>
  );
}
