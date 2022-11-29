import React from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '@mui/material';
import { usersAPI } from 'api/usersApi';
import { tasksAPI } from 'api/tasksApi';
import { authUser } from 'store/slices/userSlice';
import { useAppSelector } from 'hooks/hooks';
import { ProfileTasks } from './ProfileTasks/ProfileTasks';
import { Loader } from 'components';
import { PersonalInformation } from './PersonalInformation/PersonalInformation';

import './Profile.scss';

export const Profile: React.FC = () => {
  const { id } = useAppSelector(authUser);
  const { isLoading: userLoading } = usersAPI.useGetUserByIdQuery({ id });
  const { data: userTasks, isLoading: tasksLoading } = tasksAPI.useGetAllUserTasksQuery({ id });
  const { t } = useTranslation();

  return (
    <Container component="main" className="profile">
      <div className="profile__header">
        <h2>{t('Profile')}</h2>
      </div>
      {userLoading || tasksLoading ? (
        <Loader />
      ) : (
        <div className="profile__main">
          <PersonalInformation />
          <ProfileTasks userTasks={userTasks} />
        </div>
      )}
    </Container>
  );
};
