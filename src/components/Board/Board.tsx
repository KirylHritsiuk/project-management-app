import { Box, Button, ButtonGroup, Card } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BoardProps } from './Board.props';
import styled from './Board.module.scss';
import { boardsAPI } from 'api/boardsApi';
import { Modal } from 'components';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateBoardType } from 'types/types';

export const Board: React.FC<BoardProps> = ({ data }) => {
  const { _id, title, owner } = data;
  const navigate = useNavigate();
  const [editBoard] = boardsAPI.useUpdateBoardMutation();
  const [deleteBoard] = boardsAPI.useDeleteBoardMutation();
  const [isVisible, setVisible] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit: SubmitHandler<CreateBoardType> = (data) => {
    editBoard({ id: _id, body: { ...data, users: [] } })
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
      <Box>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button onClick={() => setVisible(true)}>Edit</Button>
          <Button onClick={() => deleteBoard({ id: _id })}>Delete</Button>
        </ButtonGroup>
        <Card variant="outlined" onClick={() => navigate(`/main/${_id}`)} className={styled.board}>
          <h3>{title}</h3>
        </Card>
      </Box>
      <Modal visible={isVisible} setModal={setVisible}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            defaultValue={title}
            {...register('title', { required: true })}
            aria-invalid={errors.title ? 'true' : 'false'}
          />
          {errors.title && <p role="alert">Please, input title</p>}
          <input type="text" defaultValue={owner} {...register('owner', { required: true })} />
          <input type="submit" />
        </form>
      </Modal>
    </>
  );
};
