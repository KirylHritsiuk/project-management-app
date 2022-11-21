import { Button, LinearProgress, Stack } from '@mui/material';
import { FC, useEffect, useState } from 'react';
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
  const { data, isLoading, error } = tasksAPI.useGetTasksQuery({ boardId, columnId });
  const [addTask] = tasksAPI.useCreateTaskMutation();

  const [order, setOrder] = useState<number>(0);
  // const [tasks, setTasks] = useState<TaskType[] | []>([]);

  useEffect(() => {
    // if (data) {
    //   setTasks(data);
    // }
    setOrder(data && data.length > 0 ? Math.max(...data.map((o) => o.order)) + 1 : 0);
  }, [data]);

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
        {data && data.map((t) => <Task task={t} key={t._id} columnId={columnId} />)}
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
          {errors.title && <p role="alert">Please, input title</p>}
          <Button type="submit">Создать</Button>
          <Button onClick={() => setVisible(false)}>Отменить</Button>
        </form>
      </Modal>
    </Stack>
  );
};
