import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Button } from '@mui/material';
import { usersAPI } from 'api/usersApi';
import { tasksAPI } from 'api/tasksApi';
import { authUser } from 'store/slices/userSlice';
import { useAppSelector } from 'hooks/hooks';
import { EditProfileForm } from './EditProfileForm/EditProfileForm';
import { ProfileTasks } from './ProfileTasks/ProfileTasks';
import { Delete, Loader } from 'components';

import './Profile.scss';

export const Profile: React.FC = () => {
  const { id } = useAppSelector(authUser);
  const { isLoading: userLoading } = usersAPI.useGetUserByIdQuery({ id });
  const { data: userTasks, isLoading: tasksLoading } = tasksAPI.useGetAllUserTasksQuery({ id });
  const [isDelete, setDelete] = useState<boolean>(false);
  const { t } = useTranslation();

  return (
    <Container component="main" className="profile">
      <div className="profile__header">
        <h2>{t('Profile')}</h2>
        <Button
          variant="contained"
          disabled={userLoading}
          onClick={() => setDelete(true)}
          className="profile__del-button"
        >
          {t('Delete')}
        </Button>
      </div>
      {userLoading || tasksLoading ? (
        <Loader />
      ) : (
        <div className="profile__main">
          <EditProfileForm />
          <ProfileTasks userTasks={userTasks} />
        </div>
      )}
      <Delete category="user" visible={isDelete} setModal={setDelete} id={{ id }} />
    </Container>
  );
};
