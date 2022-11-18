import React from 'react';
import { useTranslation } from 'react-i18next';
import { authUser } from 'store/slices/userSlice';
import { useAppSelector } from 'hooks/hooks';
import { TaskType } from 'types/types';

import './ProfileTasks.scss';

type Props = { userTasks: TaskType[] | undefined };

export const ProfileTasks: React.FC<Props> = ({ userTasks }) => {
  const { id } = useAppSelector(authUser);
  const { t } = useTranslation();
  return (
    <>
      {userTasks && userTasks.length > 0 && (
        <div className="profile__all-tasks">
          {userTasks.find((oneTask) => oneTask.userId === id) && (
            <div className="profile__tasks">
              <h3 className="profile__subtitle">{t('Own tasks')}</h3>
              {userTasks
                .filter((task) => task.userId === id)
                .map((item) => (
                  <p key={item._id}>{item.title}</p>
                ))}
            </div>
          )}
          {userTasks.find((oneTask) => oneTask.userId != id) && (
            <div className="profile__tasks">
              <h3 className="profile__subtitle">{t('Appointed tasks')}</h3>
              {userTasks
                .filter((task) => task.userId != id)
                .map((item) => (
                  <p key={item._id}>{item.title}</p>
                ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};
