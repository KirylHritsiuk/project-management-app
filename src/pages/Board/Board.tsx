import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Modal } from 'components/UI/Modal/Modal';
import { Column } from './Column/Column';
import AddIcon from '@mui/icons-material/Add';

import { usePageNavigate } from 'hooks/usePageNavigate';
import { reorder, reorderQuoteMap } from './reorder';
import { columnsAPI } from 'api/columnsApi';
import { boardsAPI } from 'api/boardsApi';
import { usersAPI } from 'api/usersApi';

import { Container, Button, LinearProgress, Stack, Box } from '@mui/material';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import {
  ChangedColumns,
  ChangedTasks,
  GetColumnType,
  TaskType,
  UpdatedAllColumns,
} from 'types/types';
import { DropResult } from './react-beautiful-dnd';

import './Board.scss';
import { Add } from './Add';
import { useTranslation } from 'react-i18next';
import { tasksAPI } from 'api/tasksApi';

export const Board = () => {
  const { t } = useTranslation();
  const { goBack } = usePageNavigate();
  const { id } = useParams();
  const boardId = id ?? '';
  const { data, isLoading, error } = columnsAPI.useGetBoardQuery({ boardId });
  const { data: board } = boardsAPI.useGetBoardByIdQuery({ id: boardId });
  const {} = usersAPI.useGetUsersQuery('');
  const [isVisible, setVisible] = useState<boolean>(false);
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
        if (value.length > 0) {
          updateAllTasks(value);
        }
        return value;
      });
    }
  }

  return (
    <Box component="main" className="column_section">
      <Button variant="contained" onClick={() => goBack()} className="backButton">
        Go Back
      </Button>
      <h2>{board?.title}</h2>
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
                return <Column column={column} index={index} key={column._id} boardId={boardId} />;
              })}
              {provided.placeholder}
              <Button
                onClick={changeVisible}
                sx={{
                  width: '250px',
                  padding: '10px 16px',
                }}
                variant="outlined"
                color="success"
                className="button_add"
                startIcon={<AddIcon />}
              >
                {t('Create column')}
              </Button>
            </Stack>
          )}
        </Droppable>
      </DragDropContext>
      <Add visible={isVisible} setModal={setVisible} boardId={boardId} order={order} />
    </Box>
  );
};
