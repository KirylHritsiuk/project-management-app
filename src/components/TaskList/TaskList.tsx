import { Button, Stack } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import { Modal } from '../UI/Modal/Modal';
import { Button, Stack } from '@mui/material';

import { GetColumnType } from '../../types/types';
import { tasksAPI } from '../../api/tasksApi';
import AddIcon from '@mui/icons-material/Add';
import { Task } from '../../components';
import { Droppable } from 'react-beautiful-dnd';

import './TaskList.scss';
import { DroppableProvided, DropResult } from '../../pages/Board/react-beautiful-dnd';
import { TaskType } from '../../types/types';

interface TaskProps {
  boardId: string;
  columnId: string;
  columnNum: number;
  column: GetColumnType;
  listType: string;
}

export const TaskList: FC<TaskProps> = ({ boardId, columnId, column, columnNum, listType }) => {
  const [isVisible, setVisible] = useState<boolean>(false);
  const [addTask] = tasksAPI.useCreateTaskMutation();
  const [order, setOrder] = useState<number>(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    setOrder(column.items.length > 0 ? Math.max(...column.items.map((o) => o.order)) + 1 : 0);
  }, [column.items]);
  const onSubmit = (value: FieldValues) => {
    addTask({
      boardId: boardId,
      columnId: columnId,
      body: {
        title: value.title,
        order: order,
        description: '_',
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
    <Stack className="tasklist_container">
      <Droppable droppableId={`droppable${column._id}${columnNum}`} type={listType}>
        {(provided: DroppableProvided) => (
          <div className="task_list" {...provided.droppableProps} ref={provided.innerRef}>
            {column.items &&
              column.items.map((t, index) => {
                return (
                  <Task
                    task={t}
                    columnNum={columnNum}
                    key={t._id}
                    columnId={columnId}
                    provided={provided}
                    innerRef={provided.innerRef}
                    index={index}
                  />
                );
              })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Button
        onClick={() => setVisible(true)}
        sx={{
          padding: '10px 46px',
        }}
        className="button_add"
        startIcon={<AddIcon />}
      />
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
