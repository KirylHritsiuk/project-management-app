import { Button, LinearProgress, Stack } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { Task } from '../../components';
import { tasksAPI } from '../../api/tasksApi';
import { Modal } from '../UI/Modal/Modal';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import './TaskList.scss';
import { DroppableProvided, DropResult } from '../../pages/Board/react-beautiful-dnd';
import { TaskType } from '../../types/types';

interface TaskProps {
  boardId: string;
  columnId: string;
}

export const TaskList: FC<TaskProps> = ({ boardId, columnId }) => {
  const [isVisible, setVisible] = useState<boolean>(false);
  const { data, isLoading, error } = tasksAPI.useGetTasksQuery({ boardId, columnId });
  const [addTask] = tasksAPI.useCreateTaskMutation();

  const [order, setOrder] = useState<number>(0);
  const [tasks, setTasks] = useState<TaskType[] | []>([]);

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
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

  function handleOrderInTasks(result: DropResult) {
    if (!result.destination) return;
    if (result.destination.droppableId === 'TASKS') {
      const items = Array.from(tasks);
      setTasks(
        items.map((item) => {
          if (item.order === result.source?.index) {
            return { ...item, order: result.destination ? result.destination.index : item.order };
          }
          if (item.order === result.destination?.index) {
            return { ...item, order: result.source.index };
          }
          return item;
        })
      );
    }
  }

  const sortCard = (a: TaskType, b: TaskType) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };

  return (
    <Stack>
      {error && <span>error</span>}
      {isLoading && <LinearProgress />}
      <DragDropContext onDragEnd={handleOrderInTasks}>
        <Droppable droppableId="TASKS">
          {(provided: DroppableProvided) => (
            <div className="task_list" {...provided.droppableProps} ref={provided.innerRef}>
              {tasks &&
                tasks
                  .slice()
                  .sort(sortCard)
                  .map((t, index) => {
                    return (
                      <Draggable key={index} draggableId={String(t.order)} index={t.order}>
                        {(provided) => (
                          <Task
                            task={t}
                            key={t._id}
                            columnId={columnId}
                            provided={provided}
                            innerRef={provided.innerRef}
                          />
                        )}
                      </Draggable>
                    );
                  })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
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
