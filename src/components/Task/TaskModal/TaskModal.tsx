import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextField, Autocomplete, Checkbox, IconButton, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { tasksAPI } from 'api/tasksApi';
import { authUser } from 'store/slices/userSlice';
import ReplayIcon from '@mui/icons-material/Replay';
import EditIcon from '@mui/icons-material/Edit';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SaveIcon from '@mui/icons-material/Save';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { BackdropLoader, Delete } from 'components';
import { showNotification } from 'store/slices/notificationSlice';
import { selectBoard } from 'store/slices/boardSlice';
import { GetUserType, TaskType } from 'types/types';
import { ReactComponent as OwnerIcon } from '../Owner.svg';
import { main } from 'store/slices/mainSlice';

import './TaskModal.scss';

type Props = {
  task: TaskType;
};

const editValuesInitial: { [key: string]: boolean } = {
  title: false,
  description: false,
  users: false,
  column: false,
};

export const TaskModal: React.FC<Props> = ({ task }) => {
  const { users: allUsers } = useAppSelector(authUser);
  const { columns } = useAppSelector(selectBoard);
  const profileBoard = useAppSelector(main).boards.find((item) => item._id === task.boardId);
  const [updateTask, status] = tasksAPI.useUpdateTaskMutation();
  const [editValues, setEditValues] = useState({ ...editValuesInitial });
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [users, setUsers] = useState<GetUserType[]>(
    allUsers?.filter((item) => task.users.includes(item._id)) as GetUserType[]
  );
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();

  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty },
    control,
    setValue,
  } = useForm();

  const onEditClick = (ev: React.MouseEvent<HTMLButtonElement>) => {
    const { name: btnName } = ev.currentTarget;
    setEditValues({ ...editValues, [btnName]: !editValues[btnName] });
    setValue(btnName, (task as { [key: string]: string | number | string[] })[btnName]);
  };

  const onSubmit = async (data: FieldValues) => {
    const body = {
      title: data.title || task.title,
      description: data.description || task.description,
      users: data.users || task.users,
      order: task.order,
      userId: task.userId,
      columnId: task.columnId,
    };
    const result = await updateTask({
      boardId: task.boardId,
      columnId: task.columnId,
      taskId: task._id,
      body,
    });
    if ('error' in result && 'status' in result.error) {
      dispatch(
        showNotification({
          isShow: true,
          text: `${t(result.error.status as string)} ${t('Task')} ${t('editFailed')}`,
          severity: 'error',
        })
      );
    }
    if ('data' in result) {
      setEditValues({ ...editValuesInitial });
      dispatch(
        showNotification({
          isShow: true,
          text: `${t('Task')} ${t('editSuccess')}`,
          severity: 'success',
        })
      );
    }
  };

  return (
    <form className="task-modal__form" onSubmit={handleSubmit(onSubmit)}>
      <div className="task-modal__field">
        {editValues.title ? (
          <TextField
            className="task-modal__input"
            variant="standard"
            required
            size="small"
            {...register('title', { required: true })}
          />
        ) : (
          <h2>{task.title}</h2>
        )}
        <IconButton
          name="title"
          onClick={onEditClick}
          color="primary"
          className="task-modal__field-btn"
        >
          {editValues.title ? <ReplayIcon /> : <EditIcon />}
        </IconButton>
      </div>

      <div className="task-modal__desc-container">
        <div className="task-modal__desc-header">
          <p className="task-modal__field-title">{t('Description')}:</p>
          <IconButton
            name="description"
            onClick={onEditClick}
            color="primary"
            className="task-modal__desc-btn"
          >
            {editValues.description ? <ReplayIcon /> : <EditIcon />}
          </IconButton>
        </div>
        <div className="task-modal__field">
          {editValues.description ? (
            <textarea
              required
              className="task-modal__input-desc"
              rows={3}
              {...register('description', { required: true })}
            />
          ) : (
            <p className="task-modal__desc">{task.description}</p>
          )}
        </div>
      </div>

      <div className="task-modal__info">
        <div className="task__creator">
          <OwnerIcon />
          {`${allUsers?.find((item) => item._id === task.userId)?.login} (${
            allUsers?.find((item) => item._id === task.userId)?.name
          })`}
        </div>
        {pathname.includes('/main') ? (
          <p className="task-modal__field-title">
            {`${t('column')}: ${columns?.find((item) => item._id === task.columnId)?.title}`}
          </p>
        ) : (
          <Link to={`/main/${profileBoard?._id}`} className="task-modal__field-title">{`${t(
            'board'
          )}: ${profileBoard?.title}`}</Link>
        )}
      </div>

      <p className="task-modal__field-title">{t('Users')}:</p>
      <div className="task-modal__field">
        {editValues.users ? (
          <Controller
            name="users"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange } }) => (
              <Autocomplete
                multiple
                disableCloseOnSelect
                size="small"
                className="task-modal__input"
                value={users}
                options={allUsers || []}
                getOptionLabel={(option) => option.login}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" />}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.login}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} placeholder={t('Search') as string} />
                )}
                onChange={(_, data) => {
                  setUsers(data);
                  onChange(data.map((u) => u!._id));
                  return data;
                }}
              />
            )}
          />
        ) : (
          <p>
            {allUsers
              ?.filter((item) => task.users.includes(item._id))
              .map((it) => it.login)
              .join(', ')}
          </p>
        )}
        <IconButton
          name="users"
          onClick={onEditClick}
          color="primary"
          className="task-modal__field-btn"
        >
          {editValues.users ? <ReplayIcon /> : <EditIcon />}
        </IconButton>
      </div>

      <div className="task-modal__btns">
        {Object.values(editValues).some((item) => item) && (
          <Button
            type="submit"
            disabled={!isValid || !isDirty}
            variant="outlined"
            startIcon={<SaveIcon />}
          >
            {t('Save')}
          </Button>
        )}
        <Button
          variant="outlined"
          startIcon={<DeleteForeverIcon />}
          disabled={Object.values(editValues).some((item) => item)}
          onClick={() => setShowDelete(true)}
        >
          {t('Delete')}
        </Button>
      </div>

      <Delete
        category="task"
        id={{ boardId: task.boardId, columnId: task.columnId, taskId: task._id }}
        visible={showDelete}
        setModal={setShowDelete}
      />
      <BackdropLoader open={status.isLoading} />
    </form>
  );
};
