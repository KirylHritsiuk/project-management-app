import { Button, Card, LinearProgress } from '@mui/material';

import { Board, Modal } from 'components';
import { useState } from 'react';
import styled from './Main.module.scss';
import { FieldValues, useForm } from 'react-hook-form';
import { CreateBoardType } from '../../types/types';
import { boardsAPI } from '../../api/boardsApi';

export function Main() {
  const { data, isLoading, error } = boardsAPI.useGetBoardsQuery('');
  const [isVisible, setVisible] = useState<boolean>(false);
  const [addBoard] = boardsAPI.useCreateBoardMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    addBoard({ ...(data as CreateBoardType), users: [] })
      .then(() => {
        setVisible(false);
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className={styled.main}>
        <h2>Your Projects</h2>
        {isLoading && <LinearProgress />}
        {error && <span>error</span>}
        <div className={styled.list}>
          {data?.map((b) => (
            <Board key={b._id} data={b} />
          ))}
          <Card>
            <Button variant="text" color="inherit" onClick={() => setVisible(true)}>
              Create Board
            </Button>
          </Card>
        </div>
      </div>
      <Modal visible={isVisible} setModal={setVisible}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder="Title"
            {...register('title', { required: true })}
            aria-invalid={errors.title ? 'true' : 'false'}
          />
          {errors.title && <p role="alert">Please, input title</p>}
          <input type="text" defaultValue={'IMask'} {...register('owner', { required: true })} />
          <input type="submit" />
        </form>
      </Modal>
    </>
  );
}
