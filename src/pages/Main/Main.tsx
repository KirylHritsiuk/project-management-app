import { LinearProgress } from '@mui/material';
import { boardsAPI } from 'api/boardsApi';
import { Board } from 'components';
import styled from './Main.module.scss';

export function Main() {
  const { data, isLoading, error } = boardsAPI.useGetBoardsQuery('');
  return (
    <main className={styled.main}>
      {isLoading && <LinearProgress />}
      {error && <span>error</span>}
      <div className={styled.list}>
        {data?.map((b) => (
          <Board key={b._id} data={b} />
        ))}
      </div>
    </main>
  );
}
