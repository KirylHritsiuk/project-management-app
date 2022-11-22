import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Modal } from '../../components/UI/Modal/Modal';
import { usePageNavigate } from '../../hooks/usePageNavigate';

import { Button, LinearProgress, Stack } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

import { columnsAPI } from '../../api/columnsApi';
import { TaskList } from '../../components';
import { Delete } from '../../components';
import { GetColumnType } from '../../types/types';

import './Board.scss';

export const Board = () => {
  const { goBack } = usePageNavigate();
  const { id } = useParams();
  const iddd = id ?? '1';
  const { data, isLoading, error } = columnsAPI.useGetColumnsQuery({ boardId: iddd });
  const [isVisible, setVisible] = useState<boolean>(false);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [delId, setDelId] = useState('');
  const [addColumn] = columnsAPI.useCreateColumnMutation();

  const [order, setOrder] = useState<number>(0);
  const [columns, setColumns] = useState<GetColumnType[] | []>([]);

  useEffect(() => {
    if (data) {
      setColumns(data);
    }
    setOrder(data && data.length > 0 ? Math.max(...data.map((o) => o.order)) + 1 : 0);
  }, [data]);

  // useEffect(() => {
  //   console.log(columns);
  // }, [columns]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const changeVisible = () => {
    setVisible(!isVisible);
  };

  const changeOpen = (id: string) => {
    setOpen(true);
    setDelId(id);
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
    console.log(result, result.type);
    if (!result.destination) return;
    if (result.type === 'COLUMN') {
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
    <div className="column_section">
      <Button variant="contained" onClick={() => goBack()} className="backButton">
        Go Back
      </Button>
      <h2>Columns {id}</h2>
      {error && <span>error</span>}
      {isLoading && <LinearProgress />}
      <DragDropContext onDragEnd={handleOrderInColumn}>
        <Droppable droppableId="COLUMN" type="COLUMN" direction="horizontal" isCombineEnabled>
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
