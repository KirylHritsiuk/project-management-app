import { Card } from '@mui/material';
import { FC } from 'react';
import { TaskType } from 'types/types';

interface TaskProps {
  task: TaskType;
}

export const Task: FC<TaskProps> = ({ task }) => {
  return (
    <Card>
      <p>{task.title}</p>
      <p>{task.description}</p>
    </Card>
  );
};
