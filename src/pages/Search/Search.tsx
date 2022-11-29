import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container } from '@mui/material';
import { Loader, Task } from 'components';
import { tasksAPI } from 'api/tasksApi';
import { boardsAPI } from 'api/boardsApi';

import './Search.scss';

export const Search: React.FC = () => {
  const { state: searchInput } = useLocation();
  const {} = boardsAPI.useGetBoardsQuery('');
  const navigate = useNavigate();
  const { t } = useTranslation();
  if (!searchInput) navigate('/main');
  const { data: tasks, isFetching } = tasksAPI.useGetSearchTasksQuery({ search: searchInput });

  return (
    <Container component="main" className="search">
      <h2>{`${t('Search')}: ${searchInput}`}</h2>
      {isFetching ? (
        <Loader />
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
          {tasks && tasks.length === 0 && <p className="search__no-task">{t('Tasks not found')}</p>}
        </>
      )}
    </Container>
  );
};
