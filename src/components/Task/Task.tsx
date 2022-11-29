import { FC, useState } from 'react';
import { Card, IconButton } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { TaskType } from 'types/types';
import { Delete } from 'components';
import { TaskModal } from './TaskModal/TaskModal';
import { Modal } from 'components/UI/Modal/Modal';
import { useAppSelector } from 'hooks/hooks';
import { authUser } from 'store/slices/userSlice';
import { ReactComponent as OwnerIcon } from './Owner.svg';

import './Task.scss';

type Props = {
  task: TaskType;
};

export const Task: FC<Props> = ({ task }) => {
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showTask, setShowTask] = useState<boolean>(false);
  const { users: allUsers } = useAppSelector(authUser);

  const changeOpen = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.stopPropagation();
    setShowDelete(true);
  };

  return (
    <>
      <Card className="task" onClick={() => setShowTask(true)}>
        <h4 className="task__title">{task.title}</h4>
        <div className="task__body">
          <div className="task__creator">
            <OwnerIcon />
            {`${allUsers?.find((item) => item._id === task.userId)?.login} (${
              allUsers?.find((item) => item._id === task.userId)?.name
            })`}
          </div>
          <IconButton onClick={changeOpen}>
            <DeleteForeverIcon fontSize="small" color="primary" />
          </IconButton>
        </div>
      </Card>

      <Delete
        category="task"
        id={{ boardId: task.boardId, columnId: task.columnId, taskId: task._id }}
        visible={showDelete}
        setModal={setShowDelete}
      />
      <Modal visible={showTask} setModal={setShowTask}>
        <TaskModal task={task} />
      </Modal>
    </>
  );
};
