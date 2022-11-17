import { LinearProgress, Typography } from '@mui/material';
import { boardsAPI } from 'api/boardsApi';
// import { usersAPI } from 'api/usersApi';
// import { usersAPI } from 'api/usersApi';
import { Board } from 'components';
// import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from './BoardList.module.scss';

function BoardList() {
  const { data, isLoading, error } = boardsAPI.useGetBoardsQuery('');
  //   const { data: set } = boardsAPI.useGetBoardsSetQuery({
  //     boardsId: ['6373e91cb298cb95dbb65138', '6373eac9b298cb95dbb6513b'],
  //   });
  const { t } = useTranslation();
  //   console.log(set);
  console.log(data, error);
  return (
    <>
      {isLoading && <LinearProgress />}
      {error && <span>error</span>}
      {data && data.length == 0 && (
        <Typography variant="h2" component="h2" className={styled.empty}>
          {t('Empty')}
        </Typography>
      )}
      <div className={styled.list}>{data && data.map((b) => <Board key={b._id} data={b} />)}</div>
    </>
  );
}

export default BoardList;
