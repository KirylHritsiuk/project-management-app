import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '@mui/material';
import { ErrorTitle, InfoTitle, Loader, Task } from 'components';
import { tasksAPI } from 'api/tasksApi';
import { boardsAPI } from 'api/boardsApi';
import { useHandlingError } from 'hooks/useHandlingError';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { main, updateSearch } from 'store/slices/mainSlice';

import './Search.scss';

export const Search: React.FC = () => {
  const { searchInput } = useAppSelector(main);
  const {} = boardsAPI.useGetBoardsQuery('');
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { catchError, setShow } = useHandlingError();
  const {
    data: tasks,
    isFetching,
    isError,
    error,
    refetch,
  } = tasksAPI.useGetSearchTasksQuery({ search: searchInput });

  const [isRefetch, setRefetch] = useState<boolean>(false);

  useEffect(() => {
    const refetchBoard = async () => {
      if (isRefetch) {
        const result = await refetch();
        setRefetch((prev) => !prev);
        if (result.isSuccess) {
          setShow((prev) => ({ ...prev, isShow: true, text: t('connect'), severity: 'success' }));
        }
      } else if (isError) {
        catchError(error);
      }
    };
    refetchBoard();
  }, [isRefetch]);

  useEffect(() => {
    return () => {
      dispatch(updateSearch(''));
    };
  }, [dispatch]);

  return (
    <Container component="main" className="search">
      <h2>{`${t('Search')}: ${searchInput}`}</h2>
      {isFetching ? (
        <Loader className="profile__loader" />
      ) : (
        <>
          {tasks && tasks.length > 0 && (
            <div className="search__tasks">
              {tasks.map((task) => (
                <div className="search__task" key={task._id}>
                  <Task task={task} />
                </div>
              ))}
            </div>
          )}
          {tasks && tasks.length === 0 && (
            <InfoTitle title={t('Tasks not found')} className="search__no-task" />
          )}
        </>
      )}
      {isError && <ErrorTitle refetch={() => setRefetch((prev) => !prev)} />}
    </Container>
  );
};
