import React from 'react';
import { Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { isExpired } from 'react-jwt';
import { Container, Button } from '@mui/material';
import { usersAPI } from 'api/usersApi';
import { tasksAPI } from 'api/tasksApi';
import { authUser, logout } from 'store/slices/userSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { EditProfileForm } from './EditProfileForm/EditProfileForm';
import { showNotification } from 'store/slices/notificationSlice';
import { ProfileTasks } from './ProfileTasks/ProfileTasks';
import { Loader } from 'components';

import './Profile.scss';

export const Profile: React.FC = () => {
  const { isAuth, id, token } = useAppSelector(authUser);
  const { isLoading: userLoading } = usersAPI.useGetUserByIdQuery({ id });
  const { data: userTasks, isLoading: tasksLoading } = tasksAPI.useGetAllUserTasksQuery({ id });
  const [deleteUser] = usersAPI.useDeleteUserMutation();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const deleteProfile = async () => {
    const delUser = await deleteUser({ id });
    if ('data' in delUser) {
      dispatch(showNotification({ isShow: true, text: `${t('Deleted')}!`, severity: 'success' }));
      dispatch(logout());
    }
    if ('error' in delUser) {
      let message;
      if ('status' in delUser.error) message = (delUser.error.data as { message: string }).message;
      else message = delUser.error.message!;
      dispatch(showNotification({ isShow: true, text: message, severity: 'error' }));
    }
  };

  return (
    <>
      {!isAuth || isExpired(token!) ? (
        <Navigate to={'/'} />
      ) : (
        <Container component="main" className="profile">
          <div className="profile__header">
            <h2>{t('Profile')}</h2>
            <Button variant="contained" onClick={deleteProfile} className="profile__del-button">
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
        </Container>
      )}
    </>
  );
};
