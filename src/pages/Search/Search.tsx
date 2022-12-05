import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '@mui/material';
import { ErrorTitle, InfoTitle, Loader, Task } from 'components';
import { tasksAPI } from 'api/tasksApi';
import { useHandlingError } from 'hooks/useHandlingError';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { main, updateSearch } from 'store/slices/mainSlice';

import './Search.scss';
import { pageAnimation } from 'constants/animation';
import { motion } from 'framer-motion';

export const Search: React.FC = () => {
  const { searchInput } = useAppSelector(main);
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
        if (result.isSuccess) {
          setShow((prev) => ({ ...prev, isShow: true, text: t('connect'), severity: 'success' }));
        } else if (result.isError) {
          catchError(result.error);
        }
        setRefetch((prev) => !prev);
      } else {
        catchError(error);
      }
    };
    refetchBoard();
  }, [isRefetch]);

  useEffect(() => {
    if (!isRefetch && isError) {
      catchError(error);
    }
  }, [isError]);

  useEffect(() => {
    return () => {
      dispatch(updateSearch(''));
    };
  }, [dispatch]);

  return (
    <Container
      component={motion.main}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageAnimation}
      className="search"
    >
      <h2>{`${t('Search')}: ${searchInput}`}</h2>
      {isFetching ? (
        <Loader className="profile__loader" />
      ) : (
        <>
          {isError && (
            <ErrorTitle
              refetch={() => setRefetch((prev) => !prev)}
              data={!!tasks}
              isFetching={isRefetch}
            />
          )}
          {tasks && tasks.length > 0 && (
            <div className="search__tasks">
              {tasks.map((task) => (
                <div className="search__task" key={task._id}>
                  <Task task={task} />
                </div>
              ))}
            </div>
          )}
          {tasks && tasks.length === 0 && !isError && !isFetching && (
            <InfoTitle title={t('Tasks not found')} className="search__no-task" />
          )}
        </>
      )}
    </Container>
  );
};
