import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePageNavigate } from '../../hooks/usePageNavigate';

import AddIcon from '@mui/icons-material/Add';
import { Button, Box, IconButton, Divider } from '@mui/material';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { columnsAPI } from '../../api/columnsApi';
import { boardsAPI } from '../../api/boardsApi';
import { usersAPI } from '../../api/usersApi';
import { tasksAPI } from '../../api/tasksApi';

import { reorder, reorderQuoteMap } from './reorder';

import { Add } from './Add';
import { Column } from './Column/Column';
import { Loader } from '../../components';

import { DropResult } from './react-beautiful-dnd';
import {
  ChangedColumns,
  ChangedTasks,
  GetColumnType,
  TaskType,
  UpdatedAllColumns,
} from '../../types/types';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import './Board.scss';

export const Board = () => {
  const { t } = useTranslation();
  const { goBack } = usePageNavigate();
  const { id } = useParams();
  const boardId = id ?? '';
  const { data, isLoading, error } = columnsAPI.useGetBoardQuery({ boardId });
  const {
    data: board,
    isLoading: boardLoad,
    error: boardErr,
  } = boardsAPI.useGetBoardByIdQuery({ id: boardId });
  const {} = usersAPI.useGetUsersQuery('');
  const [isVisible, setVisible] = useState<boolean>(false);
  const [order, setOrder] = useState<number>(0);
  const [columns, setColumns] = useState<GetColumnType[]>([]);
  const [updatedColumns] = columnsAPI.useUpdateAllColumnsMutation();
  // const [updateColumn] = columnsAPI.useUpdateColumnMutation({ boardId });
  const [updateAllTasks] = tasksAPI.useUpdateAllTasksMutation();

  useEffect(() => {
    if (data) {
      setColumns(data);
    }
    setOrder(data && data.length > 0 ? Math.max(...data.map((o) => o.order)) + 1 : 0);
  }, [data]);

  const changeVisible = () => {
    setVisible(!isVisible);
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
      updatedColumns(newSetColumns);
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
        if (value.length > 0) {
          updateAllTasks(value);
        }
        return value;
      });
    }
  }

  return (
    <Box component="main" className="column_section">
      {error && <span>error</span>}
      {boardErr && <Navigate to="/404" />}
      {isLoading || boardLoad ? (
        <Loader />
      ) : (
        <>
          <Box className="board__title-container">
            <IconButton onClick={() => goBack()} color="primary" className="board__back-btn">
              <ArrowBackIosNewIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

            <h2 className="board__title">{board?.title}</h2>
            <Button
              onClick={changeVisible}
              variant="contained"
              className="board__add-column-btn"
              startIcon={<AddIcon />}
            >
              {t('Create column')}
            </Button>
          </Box>
          <DragDropContext onDragEnd={handleOrderInColumn}>
            <Droppable droppableId="board" type="COLUMN" direction="horizontal">
              {(provided) => (
                <Box className="columns" {...provided.droppableProps} ref={provided.innerRef}>
                  {columns.map((column, index) => {
                    return (
                      <Column column={column} index={index} key={column._id} boardId={boardId} />
                    );
                  })}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
          <Add visible={isVisible} setModal={setVisible} boardId={boardId} order={order} />
        </>
      )}
    </Box>
  );
};
