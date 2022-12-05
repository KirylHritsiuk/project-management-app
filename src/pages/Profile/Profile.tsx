import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '@mui/material';
import { usersAPI } from 'api/usersApi';
import { tasksAPI } from 'api/tasksApi';
import { authUser } from 'store/slices/userSlice';
import { useAppSelector } from 'hooks/hooks';
import { ProfileTasks } from './ProfileTasks/ProfileTasks';
import { ErrorTitle, Loader } from 'components';
import { PersonalInformation } from './PersonalInformation/PersonalInformation';

import './Profile.scss';
import { motion } from 'framer-motion';
import { pageAnimation } from 'constants/animation';
import { useHandlingError } from 'hooks/useHandlingError';

export const Profile: React.FC = () => {
  const { id } = useAppSelector(authUser);
  const {
    isLoading: userLoading,
    isError: userIsError,
    error: userError,
    refetch: userRefetch,
  } = usersAPI.useGetUserByIdQuery({ id });
  const {
    data: userTasks,
    isLoading: tasksLoading,
    isError: taskIsError,
    error: taskError,
    refetch,
  } = tasksAPI.useGetAllUserTasksQuery({ id });
  const { t } = useTranslation();
  const { catchError, setShow } = useHandlingError();

  const [isRefetch, setRefetch] = useState<boolean>(false);

  useEffect(() => {
    const refetchMain = async () => {
      if (isRefetch) {
        const resultUser = await userRefetch();
        const resultTasks = await refetch();
        if (resultTasks.isSuccess && resultUser.isSuccess) {
          setShow((prev) => ({ ...prev, isShow: true, text: t('Connect'), severity: 'success' }));
        } else if (resultUser.isError) {
          catchError(resultUser.error);
        } else if (resultTasks.isError) {
          catchError(resultTasks.error);
        }
        setRefetch((prev) => !prev);
      }
    };

    refetchMain();
  }, [isRefetch]);

  useEffect(() => {
    if (!isRefetch) {
      if (taskIsError) {
        catchError(taskError);
      } else if (userIsError) {
        catchError(userError);
      }
    }
  }, [taskIsError, userIsError]);

  return (
    <Container
      component={motion.main}
      initial="initial"
      animate="in"
      exit="out"
      variants={pageAnimation}
      className="profile"
    >
      <div className="profile__header">
        <h2>{t('Profile')}</h2>
      </div>
      {userLoading || tasksLoading ? (
        <Loader className="profile__loader" />
      ) : (
        <div className="profile__main">
          <PersonalInformation />
          <ProfileTasks userTasks={userTasks} />
        </div>
      )}
      {userIsError && taskIsError && (
        <ErrorTitle refetch={() => setRefetch((prev) => !prev)} isFetching={isRefetch} />
      )}
    </Container>
  );
};
