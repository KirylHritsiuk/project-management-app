import React from 'react';
import { useTranslation } from 'react-i18next';
import { boardsAPI } from 'api/boardsApi';
import { TaskType } from 'types/types';
import { Task } from 'components';

import './ProfileTasks.scss';

type Props = { userTasks: TaskType[] | undefined };

export const ProfileTasks: React.FC<Props> = ({ userTasks }) => {
  const {} = boardsAPI.useGetBoardsQuery('');

  const { t } = useTranslation();
  return (
    <div className="profile__user-tasks">
      <h3 className="profile__subtitle">{t('You tasks')}</h3>
      <div className="profile__tasks-container">
        {userTasks && userTasks.length > 0 ? (
          <div className="profile__tasks">
            {userTasks.map((task) => (
              <Task key={task._id} task={task} />
            ))}
          </div>
        ) : (
          <p className="profile__no-tasks">{t('No tasks')}</p>
        )}
      </div>
    </div>
  );
};
