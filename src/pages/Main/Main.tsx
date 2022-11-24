import { BoardList, Loader } from 'components';
import { IconButton, Container } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { useAppSelector } from 'hooks/hooks';
import { useFilterBoards } from 'hooks/useFilterBoards';
import styled from './Main.module.scss';
import { UsersSelect } from 'components';
import { useEffect, useState } from 'react';

export function Main() {
  const [{ id }, { user }] = useAppSelector((state) => [state.user, state.main]);

  const { boards, user: userFilter, users } = useFilterBoards(user, id);
  const [refetch, setRefetch] = useState<boolean>(false);

  useEffect(() => {
    if (refetch) {
      users.refetch();
      boards.refetch();
      setRefetch((prev) => !prev);
    }
    console.log('effect');
  }, [refetch]);

  return (
    <Container component="main" className={styled.main}>
      <UsersSelect
        users={users.data}
        user={userFilter}
        id={id}
        isLoading={users.isLoading}
        isError={users.isError}
      />
      {boards.isError && (
        <IconButton onClick={() => setRefetch((prev) => !prev)} color="primary">
          <ReplayIcon />
        </IconButton>
      )}
      {boards.isLoading && <Loader className={styled.loader} />}
      <BoardList boards={boards.data} id={id} user={userFilter} isError={boards.isError} />
    </Container>
  );
}
// if (boards.error && status.isError && 'status' in status.error) {
//   if ('status' in status.error) {
//     dispatch(
//       showNotification({
//         isShow: true,
//         text: `${status.error.status}! ${t(['board', 'addFailed'])}`,
//         severity: 'error',
//       })
//     );
//   }
// } else if ('error' in result && 'status' in result.error) {
//   dispatch(
//     showNotification({
//       isShow: true,
//       text: `${result.error.status}! ${t(['board', 'addFailed'])}`,
//       severity: 'error',
//     })
//   );
// } else {
//   dispatch(
//     showNotification({
//       isShow: true,
//       text: `${t('board')} ${t('addSuccess')}`,
//       severity: 'success',
//     })
//   );
// }
