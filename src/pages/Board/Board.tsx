import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Modal } from '../../components/UI/Modal/Modal';
import { Column } from './Column/Column';

import { usePageNavigate } from '../../hooks/usePageNavigate';
import { reorder, reorderQuoteMap } from './reorder';
import { columnsAPI } from '../../api/columnsApi';

import { Button, LinearProgress, Stack } from '@mui/material';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import {
  UpdatedAllColumns,
  GetColumnType,
  ChangedColumns,
  TaskType,
  ChangedTasks,
} from '../../types/types';
import { DropResult } from './react-beautiful-dnd';

import './Board.scss';
import { tasksAPI } from '../../api/tasksApi';

export const Board = () => {
  const { goBack } = usePageNavigate();
  const { id } = useParams();
  const iddd = id ?? '1';
  const { data, isLoading, error } = columnsAPI.useGetBoardQuery({ boardId: iddd });
  const [isVisible, setVisible] = useState<boolean>(false);
  const [addColumn] = columnsAPI.useCreateColumnMutation();
  // const [deleteColumn] = columnsAPI.useDeleteColumnMutation();
  const [order, setOrder] = useState<number>(0);
  const [columns, setColumns] = useState<GetColumnType[]>([]);
  const [updatedColunms] = columnsAPI.useUpdateAllColumnsMutation();
  const [updateAllTasks] = tasksAPI.useUpdateAllTasksMutation();

  useEffect(() => {
    if (data) {
      setColumns(data);
    }
    setOrder(data && data.length > 0 ? Math.max(...data.map((o) => o.order)) + 1 : 0);
  }, [data]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const changeVisible = () => {
    setVisible(!isVisible);
  };

  const onSubmit = (value: FieldValues) => {
    addColumn({ boardId: iddd, body: { title: value.title, order: order } })
      .then(() => {
        setVisible(false);
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleOrderInColumn(result: DropResult) {
    if (!result.destination) return;
    if (result.type === 'COLUMN') {
      const state = reorder(columns, result.source.index, result.destination.index);
      setColumns(state);
      const newSetColumns = state.map((column, index) => {
        const obj = { ...column, order: index } as ChangedColumns;
        delete obj.items;
        delete obj.title;
        delete obj.boardId;
        return obj as UpdatedAllColumns;
      });
      updatedColunms(newSetColumns);
      return;
    } else {
      const value = Number(result.draggableId.slice(0, 1));
      const data = reorderQuoteMap({
        columnTasks: columns,
        source: result.source,
        destination: result.destination,
        value: value,
      });
      setColumns(data);
      const newSetTasks = [] as TaskType[][];
      data.map((column) => {
        newSetTasks.push(column.items);
      });
      newSetTasks.map((arr) => {
        const value = arr.map((tasks, index) => {
          const obj = { ...tasks, order: index } as ChangedTasks;
          delete obj.title;
          delete obj.description;
          delete obj.boardId;
          delete obj.userId;
          delete obj.users;
          return obj;
        });
        updateAllTasks(value);
        return value;
      });
    }
  }

  return (
    <div className="column_section">
      <Button variant="contained" onClick={() => goBack()} className="backButton">
        Go Back
      </Button>
      <h2>Columns {id}</h2>
      {error && <span>error</span>}
      {isLoading && <LinearProgress />}
      <DragDropContext onDragEnd={handleOrderInColumn}>
        <Droppable droppableId="board" type="COLUMN" direction="horizontal">
          {(provided) => (
            <Stack
              spacing={2}
              direction="row"
              alignItems="flex-start"
              justifyContent="flex-start"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {columns.map((column, index) => {
                return <Column column={column} index={index} key={column._id} boardId={iddd} />;
              })}
              {provided.placeholder}
              <Button onClick={changeVisible} variant="outlined" color="success">
                +Add column
              </Button>
            </Stack>
          )}
        </Droppable>
      </DragDropContext>
      <Modal visible={isVisible} setModal={setVisible}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Title Column"
            {...register('title', { required: true })}
            aria-invalid={errors.title ? 'true' : 'false'}
          />
          {errors.title && <p role="alert">Please, input title</p>}
          <input type="submit" />
        </form>
      </Modal>
    </div>
  );
};
