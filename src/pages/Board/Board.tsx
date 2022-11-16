import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { columnsAPI } from '../../api/columnsApi';
import { Modal } from '../../components/UI/Modal/Modal';
import { usePageNavigate } from '../../Hooks/usePageNavigate';
import { TaskList } from '../../components/TaskList/TaskList';

import { Button, LinearProgress, Stack } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import './Board.scss';

export const Board = () => {
  const { goBack } = usePageNavigate();
  const { id } = useParams();
  const iddd = id ?? '1';
  const { data, isLoading, error, refetch } = columnsAPI.useGetColumnsQuery({ boardId: iddd });
  const [isVisible, setVisible] = useState<boolean>(false);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [delId, setDelId] = useState('');
  const [addColumn] = columnsAPI.useCreateColumnMutation();
  const [deleteColumn] = columnsAPI.useDeleteColumnMutation();
  const order: number = data?.length ? data?.length + 1 : 0;

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
        refetch();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const delColumn = async (id: string) => {
    await deleteColumn({ boardId: iddd, columnId: id })
      .then(() => {
        refetch();
        setOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="column_section">
      <Button variant="contained" onClick={() => goBack()} className="backButton">
        Go Back
      </Button>
      <h2>Columns {id}</h2>
      {error && <span>error</span>}
      {isLoading && <LinearProgress />}
      <Stack spacing={2} direction="row" alignItems="flex-start" justifyContent="flex-start">
        {data?.map((item, index) => (
          <div key={index} className="card_column">
            <div className="card_title">
              <h3 className="column_title">{item.title}</h3>
              <DeleteForeverIcon
                fontSize="large"
                onClick={() => changeOpen(item._id)}
              ></DeleteForeverIcon>
            </div>
            <TaskList boardId={iddd} columnId={item._id} />
          </div>
        ))}
        <Button onClick={changeVisible} variant="outlined" color="success">
          +Add column
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
            <input type="submit" />
          </form>
        </Modal>
        <Modal visible={isOpen} setModal={setOpen}>
          <p>Вы действительно хотите удалить колонку?</p>
          <Button onClick={() => delColumn(delId)}>Delete</Button>
        </Modal>
      </Stack>
    </div>
  );
};
