import { LinearProgress, Stack } from '@mui/material';
import { FC } from 'react';
import { tasksAPI } from '../../api/tasksApi';
import { Task } from '../Task/Task';

interface TaskProps {
  boardId: string;
  columnId: string;
}

export const TaskList: FC<TaskProps> = ({ boardId, columnId }) => {
  const { data, isLoading, error } = tasksAPI.useGetTasksQuery({ boardId, columnId });
  return (
    <Stack>
      {error && <span>error</span>}
      {isLoading && <LinearProgress />}
      {data && data.map((t) => <Task task={t} key={t._id} />)}
    </Stack>
  );
};
