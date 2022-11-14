import { Button, LinearProgress, Stack, ListItem, Card } from '@mui/material';
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { columnsAPI } from '../../api/columnsApi';
import { TaskList } from '../../components/TaskList/TaskList';
import { Modal } from '../../components/UI/Modal/Modal';
import { usePageNavigate } from '../../Hooks/usePageNavigate';

import './Board.scss';

export const Board = () => {
  const { goBack } = usePageNavigate();
  const { id } = useParams();
  const iddd = id ?? '1';
  const { data, isLoading, error } = columnsAPI.useGetColumnsQuery({ boardId: iddd });
  const [isVisible, setVisible] = useState<boolean>(false);
  const [addColumn] = columnsAPI.useCreateColumnMutation();
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

  return (
    <div>
      <Button variant="contained" onClick={() => goBack()} className="backButton">
        Go Back
      </Button>
      <h2>Columns {id}</h2>
      {error && <span>error</span>}
      {isLoading && <LinearProgress />}
      <Stack spacing={2} direction="row">
        {data?.length
          ? data?.map((b, index) => (
              <ListItem key={index}>
                <Card variant="outlined" key={index}>
                  <h3>{b.title}</h3>
                  <span>{b.order}</span>
                  <TaskList boardId={iddd} columnId={b.id} />
                </Card>
              </ListItem>
            ))
          : null}
        <Button variant="contained" onClick={changeVisible}>
          Add column
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
      </Stack>
    </div>
  );
};
