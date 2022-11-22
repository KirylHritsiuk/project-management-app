import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { Column } from './Column/Column';
import AddIcon from '@mui/icons-material/Add';
import { usePageNavigate } from '../../hooks/usePageNavigate';

import { Button, LinearProgress, Stack } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

import { columnsAPI } from '../../api/columnsApi';

import { Button, LinearProgress, Stack, Box } from '@mui/material';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { GetColumnType } from '../../types/types';
import { DropResult } from './react-beautiful-dnd';

import './Board.scss';
import { tasksAPI } from 'api/tasksApi';
import { Add } from './Add';
import { useTranslation } from 'react-i18next';
import { TaskList } from '../../components';

import './Board.scss';
import { Delete } from '../../components';
import { GetColumnType } from '../../types/types';

export const Board = () => {
  const { t } = useTranslation();
  const { goBack } = usePageNavigate();
  const { id } = useParams();
  const boardId = id ?? '';
  const { data, isLoading, error } = columnsAPI.useGetBoardQuery({ boardId });
  const [isVisible, setVisible] = useState<boolean>(false);
  const [order, setOrder] = useState<number>(0);
  const [columns, setColumns] = useState<GetColumnType[]>([]);
  const [updatedColumns] = columnsAPI.useUpdateAllColumnsMutation();
  const [updateAllTasks] = tasksAPI.useUpdateAllTasksMutation();
  const [isOpen, setOpen] = useState<boolean>(false);
  const [delId, setDelId] = useState('');
  const [addColumn] = columnsAPI.useCreateColumnMutation();

  useEffect(() => {
    if (data) {
      setColumns(data);
    }
    setOrder(data && data.length > 0 ? Math.max(...data.map((o) => o.order)) + 1 : 0);
  }, [data]);

  // useEffect(() => {
  //   console.log(columns);
  // }, [columns]);

  const changeVisible = () => {
    setVisible(!isVisible);
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

  function handleOrderInColumn(result: DropResult) {
    if (!result.destination) return;
    const items = Array.from(columns);

    setColumns(
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

  const sortCard = (a: GetColumnType, b: GetColumnType) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };

  function handleOrderInColumn(result: DropResult) {
    if (!result.destination) return;
    if (result.destination.droppableId === 'COLUMN') {
      const items = Array.from(columns);

      setColumns(
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

  const sortCard = (a: GetColumnType, b: GetColumnType) => {
    if (a.order > b.order) {
      return 1;
    } else {
      return -1;
    }
  };

  return (
    <Box component="main" className="column_section">
      <Button variant="contained" onClick={() => goBack()} className="backButton">
        Go Back
      </Button>
      <h2>Columns {id}</h2>
      {error && <span>error</span>}
      {isLoading && <LinearProgress />}
      <DragDropContext onDragEnd={handleOrderInColumn}>
        <Droppable droppableId="COLUMN" direction="horizontal">
          {(provided) => (
            <Stack
              spacing={2}
              direction="row"
              alignItems="flex-start"
              justifyContent="flex-start"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {columns
                .slice()
                .sort(sortCard)
                .map((item, index) => {
                  return (
                    <Draggable key={index} draggableId={String(item.order)} index={item.order}>
                      {(provided) => (
                        <div
                          className="card_column"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <div className="card_title">
                            <h3 className="column_title">{item.title}</h3>
                            <DeleteForeverIcon
                              fontSize="large"
                              onClick={() => changeOpen(item._id)}
                            ></DeleteForeverIcon>
                          </div>
                          <TaskList boardId={iddd} columnId={item._id} />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
              {provided.placeholder}
            </Stack>
          )}
        </Droppable>
      </DragDropContext>
      <Button onClick={changeVisible} variant="outlined" color="success">
        +Add column
      </Button>
      {/* <Modal visible={isVisible} setModal={setVisible}>
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
      </Modal> */}
      {/* <Delete
        category="column"
        id={{ boardId: iddd, columnId: delId }}
        visible={isOpen}
        setModal={setOpen}
      /> */}
    </div>
  );
};
