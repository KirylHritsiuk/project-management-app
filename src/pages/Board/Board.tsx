import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { usePageNavigate } from '../../hooks/usePageNavigate';

import AddIcon from '@mui/icons-material/Add';
import { Button, Box, IconButton, Divider } from '@mui/material';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { columnsAPI } from '../../api/columnsApi';
import { tasksAPI } from '../../api/tasksApi';

import { reorder, reorderQuoteMap } from './reorder';

import { Add } from './Add';
import { Column } from './Column/Column';
import { Loader, ErrorTitle, InfoTitle } from '../../components';

import { DropResult } from './react-beautiful-dnd';
import { GetColumnType, TaskType, UpdatedAllColumns } from '../../types/types';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import './Board.scss';
import { useBoardTitle } from 'hooks/useBoardTitle';
import { useError } from 'hooks/useError';

export const Board = () => {
  const { t } = useTranslation();
  const { goBack } = usePageNavigate();
  const { id } = useParams();
  const { catchError, setShow } = useError();
  const boardId = id ?? '';
  const { data, isLoading, isError, error, refetch } = columnsAPI.useGetBoardQuery({ boardId });
  const [updatedColumns] = columnsAPI.useUpdateAllColumnsMutation();
  const [updateAllTasks] = tasksAPI.useUpdateAllTasksMutation();
  const { title, boardLoad, boardError } = useBoardTitle(boardId);
  const [isVisible, setVisible] = useState<boolean>(false);
  const [order, setOrder] = useState<number>(0);
  const [columns, setColumns] = useState<GetColumnType[]>([]);
  const [isRefetch, setRefetch] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setColumns(data);
    }

    setOrder(data && data.length > 0 ? Math.max(...data.map((o) => o.order)) + 1 : 0);
  }, [data]);

  useEffect(() => {
    const refetchBoard = async () => {
      if (isRefetch) {
        const result = await refetch();
        setRefetch((prev) => !prev);
        if (result.isSuccess) {
          setShow((prev) => ({ ...prev, isShow: true, text: t('connect'), severity: 'success' }));
        }
      } else if (isError) {
        catchError(error);
      }
    };
    refetchBoard();
  }, [isRefetch]);

  const changeVisible = () => {
    setVisible(!isVisible);
  };

  function handleOrderInColumn(result: DropResult) {
    if (!result.destination) return;
    if (result.type === 'COLUMN') {
      if (result.destination.index === result.source.index) return;
      const state = reorder(columns, result.source.index, result.destination.index);
      setColumns(state);
      const newState = state.map((column, index) => {
        const obj = { _id: column._id, order: index } as UpdatedAllColumns;
        return obj;
      });
      updatedColumns(newState)
        .then((val) => {
          if ('data' in val) {
            setShow({
              isShow: true,
              text: t('ChangesSuccess'),
              severity: 'success',
            });
          } else {
            catchError(val.error, `${t('ChangesFailed')}`);
          }
        })
        .catch((val) => catchError(val));
    } else {
      if (
        result.destination.index === result.source.index &&
        result.destination.droppableId === result.source.droppableId
      )
        return;
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
          const obj = { _id: tasks._id, columnId: tasks.columnId, order: index };
          return obj;
        });
        if (value.length > 0) {
          updateAllTasks(value)
            .then((val) => {
              if ('data' in val) {
                setShow({
                  isShow: true,
                  text: t('ChangesSuccess'),
                  severity: 'success',
                });
              } else {
                catchError(val.error, `${t('ChangesFailed')}`);
              }
            })
            .catch((val) => catchError(val));
        }
      });
    }
  }

  if (boardError) {
    return <Navigate to="/404" />;
  }

  return (
    <Box component="main" className="column_section">
      {isLoading || boardLoad ? (
        <Loader />
      ) : (
        <>
          <Box className="board__title-container">
            <IconButton onClick={() => goBack()} color="primary" className="board__back-btn">
              <ArrowBackIosNewIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

            {title && <h2 className="board__title">{title}</h2>}
            <Button
              onClick={changeVisible}
              variant="contained"
              className="board__add-column-btn"
              startIcon={<AddIcon />}
            >
              {t('Create column')}
            </Button>
          </Box>
          {isError && columns.length === 0 && (
            <ErrorTitle className="board_error" refetch={() => setRefetch((prev) => !prev)} />
          )}
          {!isError && columns.length === 0 && (
            <InfoTitle title={t('isEmpty')} className="board__empty" />
          )}
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
