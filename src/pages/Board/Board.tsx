import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { usePageNavigate } from '../../hooks/usePageNavigate';
import { reorder, reorderQuoteMap } from './reorder';
import { columnsAPI } from '../../api/columnsApi';

import { Button, LinearProgress, Stack } from '@mui/material';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { GetColumnType } from '../../types/types';
import { DropResult } from './react-beautiful-dnd';

import './Board.scss';
import { tasksAPI } from 'api/tasksApi';
import { TaskList } from 'components';

export const Board = () => {
  const { goBack } = usePageNavigate();
  const { id } = useParams();
  const boardId = id ?? '1';
  const { data, isLoading, error } = columnsAPI.useGetBoardQuery({ boardId });
  const [isVisible, setVisible] = useState<boolean>(false);
  const [addColumn] = columnsAPI.useCreateColumnMutation();
  const [order, setOrder] = useState<number>(0);
  const [columns, setColumns] = useState<GetColumnType[]>([]);
  const [updatedColumns] = columnsAPI.useUpdateAllColumnsMutation();
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
    addColumn({ boardId, body: { title: value.title, order } })
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
      <Button onClick={changeVisible} variant="outlined" color="success">
        +Add column
      </Button>
    </div>
  );
};
