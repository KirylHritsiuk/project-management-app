import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container } from '@mui/material';
import { Loader } from 'components';
import { tasksAPI } from 'api/tasksApi';

// import './SignIn.scss';

export const Search: React.FC = () => {
  const { state: searchInput } = useLocation();
  const navigate = useNavigate();
  if (!searchInput) navigate('/main');

  const { data: tasks, isLoading: tasksLoad } = tasksAPI.useGetSearchTasksQuery({
    search: searchInput,
  });
  const { t } = useTranslation();
  console.log(searchInput);

  return (
    <Container component="main" className="auth">
      {tasksLoad && <Loader />}
      {tasks && tasks.length > 0 && (
        <div className="profile__main">
          <p>
            {t('Search')}: {searchInput}
          </p>
          {tasks.map((task) => (
            <p key={task._id}>{task.title}</p>
          ))}
        </div>
      )}
    </Container>
  );
};
