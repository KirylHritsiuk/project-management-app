import { Button, LinearProgress, Stack } from '@mui/material';
import { FC, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { tasksAPI } from '../../api/tasksApi';
import { Task } from '../Task/Task';
import { Modal } from '../UI/Modal/Modal';

import './TaskList.scss';

interface TaskProps {
  boardId: string;
  columnId: string;
}

export const TaskList: FC<TaskProps> = ({ boardId, columnId }) => {
  const [isVisible, setVisible] = useState<boolean>(false);
  const { data, isLoading, error, refetch } = tasksAPI.useGetTasksQuery({ boardId, columnId });
  const [addTask] = tasksAPI.useCreateTaskMutation();
  const order: number = data?.length ? data?.length + 1 : 0;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (value: FieldValues) => {
    addTask({
      boardId: boardId,
      columnId: columnId,
      body: {
        title: value.title,
        order: order,
        description: '123',
        userId: 1,
        users: [],
      },
    })
      .then(() => {
        setVisible(false);
        reset();
        refetch();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Stack>
      {error && <span>error</span>}
      {isLoading && <LinearProgress />}
      <div className="task_list">
        {data && data.map((t, index) => <Task task={t} key={index} columnId={columnId} />)}
      </div>
      <Button onClick={() => setVisible(true)} variant="outlined" color="success">
        +Add task
      </Button>
      <Modal visible={isVisible} setModal={setVisible}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Title Column"
            {...register('title', { required: true })}
            aria-invalid={errors.title ? 'true' : 'false'}
          />
          <input type="submit" />
          {errors.title && <p role="alert">Please, input title</p>}
          <Button onClick={() => setVisible(false)}>Создать</Button>
          <Button onClick={() => setVisible(false)}>Отменить</Button>
        </form>
      </Modal>
    </Stack>
  );
};
