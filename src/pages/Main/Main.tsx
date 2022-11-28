import { BoardList, Loader } from 'components';
import { IconButton, Container } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';
import { useAppDispatch } from 'hooks/hooks';
import { useFilterBoards } from 'hooks/useFilterBoards';
import styled from './Main.module.scss';
import { UsersSelect } from 'components';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { showNotification } from 'store/slices/notificationSlice';

export function Main() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const { id, boards, user: userFilter, users } = useFilterBoards();
  const [refetch, setRefetch] = useState<boolean>(false);

  useEffect(() => {
    const refetchFun = async () => {
      if (refetch) {
        await users.refetch();
        await boards.refetch();
        setRefetch((prev) => !prev);
        if ('error' in boards && boards.error && 'status' in boards.error) {
          dispatch(
            showNotification({
              isShow: true,
              text: t(boards.error.status as string),
              severity: 'error',
            })
          );
        } else if (boards.isSuccess || users.isSuccess) {
          dispatch(
            showNotification({
              isShow: true,
              text: t('connect'),
              severity: 'success',
            })
          );
        }
      }
    };
    refetchFun();
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
  }, [boards.isError]);

  useEffect(() => {
    if (users.isError && 'error' in users && users.error && 'status' in users.error) {
      // console.log(users.error);
      dispatch(
        showNotification({
          isShow: true,
          text: `${t(users.error.status as string)}`,
          severity: 'error',
        })
      );
    }
  }, [users.isError]);

  return (
    <Container
      className={styled.main}
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
