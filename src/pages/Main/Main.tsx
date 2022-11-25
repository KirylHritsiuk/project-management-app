import { BoardList, Loader } from 'components';
import { IconButton, Container } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useFilterBoards } from 'hooks/useFilterBoards';
import styled from './Main.module.scss';
import { UsersSelect } from 'components';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { showNotification } from 'store/slices/notificationSlice';

export function Main() {
  const [{ id }, { user }] = useAppSelector((state) => [state.user, state.main]);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { boards, user: userFilter, users } = useFilterBoards(user, id);
  const [refetch, setRefetch] = useState<boolean>(false);

  useEffect(() => {
    if (refetch) {
      users.refetch();
      boards.refetch();
      setRefetch((prev) => !prev);
      // if ('error' in boards && boards.error && 'status' in boards.error) {
      //   dispatch(
      //     showNotification({
      //       isShow: true,
      //       text: t(boards.error.status as string),
      //       severity: 'error',
      //     })
      //   );
      // } else {
      //   dispatch(
      //     showNotification({
      //       isShow: true,
      //       text: t('connect'),
      //       severity: 'success',
      //     })
      //   );
      // }
    }
  }, [refetch]);

  useEffect(() => {
    if (boards.isError && 'error' in boards && boards.error && 'status' in boards.error) {
      dispatch(
        showNotification({
          isShow: true,
          text: t(boards.error.status as string),
          severity: 'error',
        })
      );
    }
    // else {
    //   dispatch(
    //     showNotification({
    //       isShow: true,
    //       text: t('connect'),
    //       severity: 'success',
    //     })
    //   );
    // }
  }, [boards.isError]);

  return (
    <Container
      component="main"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      <UsersSelect
        users={users.data}
        user={userFilter}
        id={id}
        isLoading={users.isLoading}
        isError={users.isError}
      />
      {boards.isLoading && <Loader className={styled.loader} />}
      {boards.isError && (
        <IconButton onClick={() => setRefetch((prev) => !prev)} color="primary">
          <ReplayIcon />
        </IconButton>
      )}
      {!boards.isLoading && (
        <BoardList
          boards={boards.data}
          id={id}
          user={userFilter}
          isError={boards.isError}
          isLoading={boards.isLoading}
          isFetching={boards.isFetching}
        />
      )}
    </Container>
  );
}
