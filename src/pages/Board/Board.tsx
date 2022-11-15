import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import { columnsAPI } from '../../api/columnsApi';
import { Modal } from '../../components/UI/Modal/Modal';
import { usePageNavigate } from '../../Hooks/usePageNavigate';
import { TaskList } from '../../components/TaskList/TaskList';

import { Button, LinearProgress } from '@mui/material';

import Image from './delete_icon.png';
import './Board.scss';

export const Board = () => {
  const { goBack } = usePageNavigate();
  const { id } = useParams();
  const iddd = id ?? '1';
  const { data, isLoading, error, refetch } = columnsAPI.useGetColumnsQuery({ boardId: iddd });
  const [isVisible, setVisible] = useState<boolean>(false);
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

  const delColumn = (id: string) => {
    deleteColumn({ boardId: iddd, columnId: id })
      .then(() => {
        refetch();
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
      <ul className="list_column">
        {data?.map((item, index) => (
          <li key={index} className="card_column">
            <div>
              <h3 className="column_title">{item.title}</h3>
              <button onClick={() => delColumn(item._id)}>
                <img src={Image} alt="Кнопка «button»" className="del_button" />
              </button>
            </div>
            <TaskList boardId={iddd} columnId={item._id} />
          </li>
        ))}
        <button onClick={changeVisible} className="add_button">
          +Add column
        </button>
      </ul>
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
    </div>
  );
};
