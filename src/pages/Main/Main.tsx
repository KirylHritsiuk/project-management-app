import { BoardList, ErrorTitle, Loader } from 'components';
import { Container } from '@mui/material';
import { useFilterBoards } from 'hooks/useFilterBoards';
import styled from './Main.module.scss';
import { UsersSelect } from 'components';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHandlingError } from 'hooks/useHandlingError';

export function Main() {
  const { t } = useTranslation();
  const { catchError, setShow } = useHandlingError();

  const {
    id,
    boards: { data, error, isError, isLoading, isFetching, refetch },
    user: userFilter,
    users,
  } = useFilterBoards();
  const [isRefetch, setRefetch] = useState<boolean>(false);

  useEffect(() => {
    const refetchBoard = async () => {
      if (isRefetch) {
        const resultUsers = await users.refetch();
        const resultBoards = await refetch();
        setRefetch((prev) => !prev);
        if (resultUsers.isSuccess && resultBoards.isSuccess) {
          setShow((prev) => ({ ...prev, isShow: true, text: t('connect'), severity: 'success' }));
        }
      } else if (isError) {
        catchError(error);
      }
    };
    refetchBoard();
  }, [isRefetch]);

  useEffect(() => {
    if (users.isError) {
      catchError(users.error);
    }
  }, [users]);

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
        refetch={() => setRefetch((prev) => !prev)}
      />
      {isLoading && isFetching && <Loader className={styled.loader} />}
      {isError && <ErrorTitle refetch={() => setRefetch((prev) => !prev)} data={!!data} />}
      <BoardList
        boards={data}
        id={id}
        user={userFilter}
        isError={isError}
        isLoading={isLoading}
        isFetching={isFetching}
      />
    </Container>
  );
}
